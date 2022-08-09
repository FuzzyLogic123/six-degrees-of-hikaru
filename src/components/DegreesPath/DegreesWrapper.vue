
<script>
import KingSvg from '../svg/King.vue';
import HeroHeader from '.././HeroHeader.vue';
import DegreesPath from "./DegreesPath.vue";
import { queryDatabase, incrementPathsCount } from '@/firebaseConfig';
import Modal from '../Modal.vue';
import { computed } from '@vue/reactivity';

const MAX_REQUEST_ATTEMPTS = 3;

export default {
    components: {
        HeroHeader,
        KingSvg,
        DegreesPath,
        Modal
    },
    data() {
        return {
            userChain: [],
            username: '',
            timeControl: 'bullet',
            alreadyTriedUsers: [],
            loading: false,
            modalConfig: {
                showModal: false,
                isShowingResult: false,
                showImage: true,
                category: "success",
                title: "",
                body: "Something went wrong"
            },
            shareableText: "Find the chain from you to Hikaru!",
            expandDiv: false
        }
    },
    provide() {
        return {
            shareableText: computed(()=> this.shareableText),
            timeControl: computed( ()=> this.timeControl)
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
            let output = `I'm ${userChain.length - 1} degree${userChain.length > 2 ? 's' : ''} from Hikaru!\n`;
            for (let i = 0; i < userChain.length - 1; i++) {
                const user = userChain[i];
                output += `${user.username} ${user.rating} --> \n`;
            }
            output += `${userChain.at(-1).username} ${userChain.at(-1).rating}\n`;
            output += "\n";
            output += `Come see ${this.username}'s chain at `;
            console.log(output);
            return {
                text: output,
                link: `http://sixdegreesofhikaru.com/#${this.username}/${this.timeControl}`
            }
        },
        showError(errorMessage) {
            this.modalConfig.title = "Oops..."
            this.modalConfig.body = errorMessage;
            this.modalConfig.showImage = true;
            this.modalConfig.category = "failure";
            this.modalConfig.showModal = true;
            this.loading = false;
        },
        showResult() {
            this.modalConfig.body = this.generateFinalPathString(this.userChain);
            this.modalConfig.title = '';
            this.modalConfig.isShowingResult = true;
            this.modalConfig.showImage = true;
            this.modalConfig.category = "success";
            this.modalConfig.showModal = true;
            this.shareableText = this.generateShareableText(this.userChain);
            this.loading = false;
        },
        async isValidChessUsername() {
            try {
                const res = await fetch(`https://api.chess.com/pub/player/${this.username}`);
                const data = await res.json();
                if (data.code === 0) {
                    console.log("false was returned")
                    return false;
                } else {
                    return true;
                }
            } catch {
                console.error("chess.com username verification failed");
                //even if error check failed, still continue
                return true;
            }
        },
        async getMostRecentWin(username, timeControl) {
            const res = await fetch(`https://api.chess.com/pub/player/${username}/games/archives`);
            const data = await res.json();
            if (data.code === 0) {
                console.log('the username entered does not exist');
                return false;
            }
            else if (!data.archives.length) {
                console.log('the user has not played any games');
                return false;
            }
            for (let i = data.archives.length - 1; i >= 0; i--) {
                const gameListHttpRequest = await fetch(data.archives[i]);
                const gameList = await gameListHttpRequest.json();
                const candidateGames = [];
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
                    // console.log(candidateGames);
                    const highestRatedRecentOpponent = candidateGames.sort((a, b) => b.rating - a.rating)[0];
                    console.log("highest rated oponent", highestRatedRecentOpponent.username, highestRatedRecentOpponent.rating);
                    return highestRatedRecentOpponent.username;
                } else {
                    console.log(`${username} has not won any games`);
                }
            }
            return false;
        },
        async getNextOptionHelper(username, timeControl) {
            const result = await this.getMostRecentWin(username, timeControl);
            if (!result) {
                this.alreadyTriedUsers.push(this.userChain.at(-1).username);
                this.userChain = [this.userChain[0]];
                console.log("chain reset");
                return await this.getNextOptionHelper(this.userChain[0].username, timeControl);
            }
            return result
        },
        async extendUserChain() {
            const mostRecentUser = this.userChain.at(-1);
            if (mostRecentUser.name === "Hikaru Nakamura") {
                console.log(this.userChain);
                incrementPathsCount();
                setTimeout(this.showResult, 2000)
                return this.userChain;
            }
            if (!mostRecentUser?.username) {
                console.error("user does not have a username!");
            }
            // check database for user
            // console.log(mostRecentUser.username)
            const databaseResult = await queryDatabase(mostRecentUser.username, this.timeControl)
            if (databaseResult) {
                mostRecentUser.next_player = databaseResult.next_player;
                console.log(databaseResult);
                console.log('database returned next :  ' + databaseResult.next_player);
            }

            // request cloud function get game type from dropdown
            const bestWin = await this.fetchBestWin(mostRecentUser.next_player, this.timeControl, MAX_REQUEST_ATTEMPTS);
            if (bestWin && !this.alreadyTriedUsers.includes(bestWin.username)) {
                this.alreadyTriedUsers.push(bestWin.username);
                this.userChain.push(bestWin);
                console.log(bestWin.username);
            } else {
                bestWin?.username && console.log("this was rejected", bestWin.username);
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
        async fetchBestWin(username, timeControl, requestAttemps) {
            if (requestAttemps !== 0 && username) {
                try {
                    // const res = await fetch("https://us-central1-six-degrees-of-hikaru-cf099.cloudfunctions.net/scraper", {
                    const res = await fetch("http://localhost:5001/six-degrees-of-hikaru-cf099/us-central1/scraper", {
                        method: 'POST',
                        body: JSON.stringify({
                            "text": `https://www.chess.com/stats/live/${timeControl}/${username}`
                        })
                    });
                    const response = await res.json();
                    // console.log(response);
                    return response;
                } catch (e) {
                    console.log(e);
                    await this.fetchBestWin(username, timeControl, requestAttemps - 1);
                }
            } else {
                return false;
            }
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
            if (!await this.isValidChessUsername() || !/^[A-Za-z0-9-_]*$/.test(this.username)) {
                this.showError(`${this.username} is not a valid username`);
                return;
            }
            console.log(this.$refs.degreesPath);
            const bestWin = await this.fetchBestWin(this.username, this.timeControl, MAX_REQUEST_ATTEMPTS);
            let firstUserData;
            if (bestWin) {
                firstUserData = bestWin
            } else {
                firstUserData = {
                    username: this.username,
                    next_player: ""
                }
            }
            if (!firstUserData?.next_player) {
                const mostRecentWin = await this.getMostRecentWin(this.username, this.timeControl);
                if (mostRecentWin) {
                    firstUserData.next_player = mostRecentWin;
                } else {
                    console.error("the player seems to have won no games within this time control");
                    this.showError("Looks like you haven't won any games in this time control");
                    return;
                }
            }
            this.userChain.push(firstUserData);
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
        }
    },
    mounted() {
        const hash = this.getHash();
        console.log(hash)
        if (hash) {
            const [username, timeControl] = hash;
            this.username = username
            this.timeControl = timeControl
            this.startUserChainSearch();
        }

    }
}



// TODO - decide whether to branch off users or just start from the start
// TODO - Prevent infinite loops/ cycles where players best wins go on forever (including when the backup suggests someone that will again cause an infinite loop)
// can be achieved by using ref to track list of players that have been tried so far, never use these to enter the list.
// TODO - add dropdown to selectTIME_CONTROLor blitz (update this in the path finding code)
// TODO - update rendering to show displayToUserChain (add animations) -->
// TODO - update usernameChain to a list of all users that have been tried so far



</script>

<template>
    <div>

        <div class="pt-12 pb-16 flex justify-center gap-6 w-full">
            <!-- <form action="#"> -->
            <input name=search spellCheck=false autocomplete=off :disabled="this.loading" ref="degreesPath"
                class="w-full basis-2/4 inline-block text-white p-3 rounded-md border-2 border-slate-800 bg-slate-900 xl:text-xl xs:text-lg"
                type="text" placeholder="chess.com username" v-model="this.username" @keyup.enter="(event) => {
                    event.target.blur();
                    this.startUserChainSearch();
                }" />
            <!-- </form> -->
            <select v-model="this.timeControl" name="time-control" :disabled="this.loading"
                class="text-slate-400 p-3 rounded-md border-2 border-slate-800 bg-slate-900 non-shiny">
                <option value=bullet>Bullet</option>
                <option value="blitz">Blitz</option>
            </select>
            <button
                class='hidden sm:inline-block bg-slate-900 border-slate-800 border-2 rounded-md xl:text-xl text-lg text-white hover:stroke-slate-50 stroke-slate-400 disabled:stroke-gray-500 disabled:opacity-60'
                @click="this.startUserChainSearch" :disabled="this.loading || !this.username">
                <KingSvg class="scale-75" />
            </button>
        </div>
        <div class="md:mt-10 2xl:mt-20 min-h-[20rem]" :class="{ 'expandHeight': this.expandDiv }">
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
            {{ this.modalConfig.title }}
        </template>
        <template #body>
            <div v-html="this.modalConfig.body"></div>
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

.non-shiny {
    -webkit-appearance: none;
}
</style>