
<script>
import HeroHeader from '.././HeroHeader.vue';
import UsernameInput from './UsernameInput.vue';
import DegreesPath from "./DegreesPath.vue";
import { queryDatabase, incrementPathsCount, analytics } from '@/firebaseConfig';
import Modal from '../Modal.vue';
import { computed } from '@vue/reactivity';
import { writePathToDatabase } from '../../firebaseConfig';
import { logEvent } from '@firebase/analytics';
import { fetchBestWin } from '../../api/fetchNextBestWin';


export default {
    components: {
        HeroHeader,
        DegreesPath,
        Modal,
        UsernameInput
    },
    data() {
        return {
            userChain: [],
            username: '',
            timeControl: 'blitz',
            alreadyTriedUsers: [],
            loading: false,
            firstUserData: {
                username: this.username,
                next_player: ""
            },
            modalConfig: {
                showModal: false,
                showImage: true,
                category: "success",
            },
            modalText: {
                title: "",
                body: "Something went wrong"
            },
            shareableText: "Find the chain from you to Hikaru!",
            expandDiv: false
        }
    },
    provide() {
        return {
            shareableText: computed(() => this.shareableText),
            timeControl: computed(() => this.timeControl)
        }
    },
    methods: {
        generateFinalPathString(userChain) {
            let output = "";
            const firstRating = userChain[0]?.rating;
            const lastRating = userChain.at(-1).rating;
            if (firstRating) {
                output += `You went from <b>${firstRating}</b> to <b>${lastRating}</b> in <b>${userChain.length - 1}</b> degree${userChain.length > 2 ? 's' : ''}`;
            } else {
                output += `You reached ${lastRating} in ${userChain.length - 1} degrees`;
            }
            return output;
        },
        generateShareableText(userChain) {
            let output = `I'm ${userChain.length - 1} win${userChain.length > 2 ? 's' : ''} from Hikaru in ${this.timeControl}!\n\n`;
            for (let i = 0; i < userChain.length - 1; i++) {
                const user = userChain[i];
                output += `${user.username} ${user.rating}\n`;
            }
            output += `${userChain.at(-1).username} ${userChain.at(-1).rating}\n`;
            output += "\n";
            output += `Come see ${this.username}'s chain at `;
            return {
                text: output,
                link: `http://sixdegreesofhikaru.com/#${this.username}/${this.timeControl}`
            }
        },
        showError(errorMessage) {
            this.modalText.title = "Oops..."
            this.modalText.body = errorMessage;
            this.modalConfig.showImage = true;
            this.modalConfig.category = "failure";
            this.modalConfig.showModal = true;
            this.loading = false;
        },
        showResult() {
            this.modalText.body = this.generateFinalPathString(this.userChain);
            this.modalText.title = '';
            this.modalConfig.showImage = true;
            this.modalConfig.category = "success";
            this.modalConfig.showModal = true;
            this.shareableText = this.generateShareableText(this.userChain);
            this.loading = false;
        },
        async isValidChessUsername() {
            try {
                // timeout the request after 5 seconds
                const controller = new AbortController();
                setTimeout(() => controller.abort(), 5000);

                const res = await fetch(`https://api.chess.com/pub/player/${this.username}`, { signal: controller.signal });
                const data = await res.json();
                if (data.code === 0) {
                    return false;
                } else {
                    this.firstUserData["avatar"] = data.avatar;
                    this.firstUserData["name"] = data.name;
                    return true;
                }
            } catch {
                console.error("chess.com username verification failed");
                //even if error check failed, still continue
                return true;
            }
        },
        getCapitalisedUsername(playerGames) {
            if (playerGames.length > 0) {
                if (playerGames[0].white.username.toLowerCase() === this.username.toLowerCase()) {
                    return playerGames[0].white.username
                } else {
                    return playerGames[0].black.username
                }
            }
            return ""
        },
        async getMostRecentWin(username, timeControl) {
            let correctedUsername = false;
            const res = await fetch(`https://api.chess.com/pub/player/${username}/games/archives`);
            const data = await res.json();
            if (data.code === 0) {
                console.log('the username entered does not exist');
                return false;
            }
            else if (!data.archives.length) {
                console.log('the user has not played any games');
                logEvent(analytics, "not_enough_games");
                return false;
            }
            for (let i = data.archives.length - 1; i >= 0; i--) {
                const gameListHttpRequest = await fetch(data.archives[i]);
                const gameList = await gameListHttpRequest.json();
                const candidateGames = [];

                if (!correctedUsername && this.userChain.length === 0) {
                    const username = this.getCapitalisedUsername(gameList.games);
                    if (username.length > 0) {
                        this.firstUserData["username"] = username
                        correctedUsername = true;
                    }
                }

                for (let i = gameList.games.length - 1; i >= 0; i--) {
                    const game = gameList.games[i];
                    if (game.time_class === timeControl && game.white.result === 'win' && game.white.username.toLowerCase() === username.toLowerCase() && !this.alreadyTriedUsers.includes(game.black.username)) {
                        candidateGames.push({
                            username: game.black.username,
                            rating: game.black.rating
                        });
                    } else if (game.time_class === timeControl && game.black.result === 'win' && game.black.username.toLowerCase() === username.toLowerCase() && !this.alreadyTriedUsers.includes(game.white.username)) {
                        candidateGames.push({
                            username: game.white.username,
                            rating: game.white.rating
                        });
                    }
                }
                if (candidateGames.length > 0) {
                    const highestRatedRecentOpponent = candidateGames.sort((a, b) => b.rating - a.rating)[0];
                    return highestRatedRecentOpponent.username;
                } else {
                    console.log(`${username} has not won any games`);
                }
            }
            return false;
        },
        async getNextOptionHelper(username, timeControl) {
            let result = await this.getMostRecentWin(username, timeControl);
            if (!result) {
                this.alreadyTriedUsers.push(this.userChain.at(-1).username);
                this.userChain = [this.userChain[0]];
                console.log("chain reset");
                result = await this.getMostRecentWin(this.userChain[0].username, timeControl);
            }
            return result
        },
        async extendUserChain() {
            let receivedDatabaseResult = false;
            const mostRecentUser = this.userChain.at(-1);
            if (mostRecentUser.name === "Hikaru Nakamura") {
                incrementPathsCount(3);
                writePathToDatabase(this.username, this.userChain.length - 1, this.timeControl);
                setTimeout(this.showResult, 2000);
                logEvent(analytics, "path_completed");
                return this.userChain;
            }
            if (!mostRecentUser?.username) {
                console.error("user does not have a username!");
            }
            // check database for user
            const databaseResult = await queryDatabase(mostRecentUser.username.toLowerCase(), this.timeControl)
            if (databaseResult) {
                receivedDatabaseResult = true;
                mostRecentUser.next_player = databaseResult;
            }

            // request cloud function get game type from dropdown
            const bestWin = await fetchBestWin(mostRecentUser.next_player, this.timeControl);

            if (bestWin && !this.alreadyTriedUsers.includes(bestWin.username)) {
                this.alreadyTriedUsers.push(bestWin.username);
                this.userChain.push(bestWin);
            } else if (receivedDatabaseResult && !bestWin) {
                this.userChain.push({
                    username: mostRecentUser.next_player,
                });
            } else {
                const mostRecentWin = await this.getNextOptionHelper(this.userChain.at(-1).next_player, this.timeControl); //should basically always return someone unless every player in the chain has not won any games of that time control
                if (!mostRecentWin) {
                    this.showError(`${username} has not played enough games to calculate route :(`);
                    this.userChain = [];
                    return;
                } else {
                    this.userChain.at(-1).next_player = mostRecentWin;
                }
            }
            await this.extendUserChain();
        },
        async startUserChainSearch() {
            if (!this.username || this.loading) { console.log("one chain at a time please"); return };
            if (this.username.toLowerCase() === "hikaru") {
                this.showError("Can we get you a nobel prize for outside the box thinking?");
                return;
            }
            this.userChain = [];
            this.alreadyTriedUsers = [];
            this.loading = true;

            //check if the username is valid
            if (!/^[A-Za-z0-9-_]*$/.test(this.username) || !await this.isValidChessUsername()) {
                this.showError(`${this.username} is not a valid username`);
                return;
            }
            const bestWin = await fetchBestWin(this.username, this.timeControl);
            if (bestWin) {
                this.firstUserData = bestWin
            }
            if (!this.firstUserData?.next_player) {
                const mostRecentWin = await this.getMostRecentWin(this.username, this.timeControl);
                if (mostRecentWin) {
                    this.firstUserData.next_player = mostRecentWin;
                } else {
                    console.error("the player seems to have won no games within this time control");
                    this.showError("Looks like you haven't won any games in this time control");
                    return;
                }
            }
            this.userChain.push(this.firstUserData);
            this.expandDiv = true;
            this.$refs.degreesPath.scrollIntoView();
            this.extendUserChain();
        },
        getHash() {
            if (window.location.hash) {
                if (window.location.hash.split("/").length - 1 === 1) {
                    const hash = window.location.hash.split("#")[1].split("/")
                    return [hash[0], hash[1]]
                }
            }
        },
        updateAnalyitics() {

        }
    },
    mounted() {
        const hash = this.getHash();
        if (hash) {
            const [username, timeControl] = hash;
            this.username = username
            this.timeControl = timeControl
            this.startUserChainSearch();
        }

    }
}

</script>

<template>
    <div>
        <UsernameInput v-model:username="this.username" v-model:timeControl="this.timeControl" :loading="this.loading" @startUserChainSearch="this.startUserChainSearch" ref="degreesPath"/>
        <div class="md:mt-10 2xl:mt-20 min-h-[20vh]" :class="{ 'expandHeight': this.expandDiv }">
            <Transition name="fade" mode="out-in">
                <p class="text-center text-3xl font-thin text-white" v-if="this.loading && this.userChain.length === 0">
                    loading<span class="one">.</span><span class="two">.</span><span class="three">.</span>
                </p>
                <DegreesPath :pathArray="this.userChain" v-else />
            </Transition>
        </div>
    </div>

    <Modal v-bind="this.modalConfig" @close-modal="this.modalConfig.showModal = false">
        <template #title>
            {{ this.modalText.title }}
        </template>
        <template #body>
            <div v-html="this.modalText.body"></div>
        </template>
    </Modal>
</template>

<style>
.one {
    opacity: 0;
    animation: dot 1.3s infinite;
    animation-delay: 0.0s;
}

.two {
    opacity: 0;
    animation: dot 1.3s infinite;
    animation-delay: 0.2s;
}

.three {
    opacity: 0;
    animation: dot 1.3s infinite;
    animation-delay: 0.3s;
}


@keyframes dot {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.expandHeight {
    min-height: 100vh !important;
}

/* .non-shiny {
    -webkit-appearance: none;
} */
</style>