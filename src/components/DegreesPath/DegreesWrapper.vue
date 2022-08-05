
<script>

import KingSvg from '../svg/King.vue';
import HeroHeader from '.././HeroHeader.vue';
import DegreesPath from "./DegreesPath.vue";
import { queryDatabase } from '@/firebaseConfig';

const MAX_REQUEST_ATTEMPTS = 1;

export default {
    components: {
        HeroHeader,
        KingSvg,
        DegreesPath
    },
    data() {
        return {
            userChain: [],
            username: 'jrt829',
            timeControl: 'bullet',
            alreadyTriedUsers: [],
            loading: false
        }
    },
    watch: {
        userChain(newChain, oldChain) {
            // console.log(newChain);
        }
    },
    methods: {
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
        },
        async getNextOptionHelper(timeControl) {
            const result = await this.getMostRecentWin(this.userChain.at(-1).next_player, timeControl);
            if (!result) {
                this.alreadyTriedUsers.push(this.userChain.at(-1).username);
                this.userChain = [this.userChain[0]];
                console.log("chain reset");
                return await this.getNextOptionHelper(timeControl);
            }
            return result
        },
        async extendUserChain() {
            const mostRecentUser = this.userChain.at(-1);
            if (mostRecentUser.name === "Hikaru Nakamura") {
                console.log(this.userChain);
                this.loading = false;
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
                bestWin?.username && console.log("this was rejected", bestWin.username)
                const mostRecentWin = await this.getNextOptionHelper(this.timeControl); //should basically always return someone unless every player in the chain has not won any games of that time control
                // console.log(mostRecentWin);
                this.userChain.at(-1).next_player = mostRecentWin;
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
            if (!this.username || this.loading) { console.log("the thing was blocked"); return };
            this.userChain = [];
            this.alreadyTriedUsers = [];
            this.loading = true;
            const firstUserData = await this.fetchBestWin(this.username, this.timeControl, MAX_REQUEST_ATTEMPTS);
            if (!firstUserData) {
                console.error("invalid username");
                return;
            }
            if (!firstUserData?.next_player) {
                const mostRecentWin = await this.getMostRecentWin(this.username, this.timeControl);
                if (mostRecentWin) {
                    firstUserData.next_player = mostRecentWin;
                } else {
                    console.error("the player seems to have won no games within this time control");
                    return;
                }
            }
            this.userChain.push(firstUserData)
            this.extendUserChain();
        }
    },
}



// TODO - decide whether to branch off users or just start from the start
// TODO - Prevent infinite loops/ cycles where players best wins go on forever (including when the backup suggests someone that will again cause an infinite loop)
// can be achieved by using ref to track list of players that have been tried so far, never use these to enter the list.
// TODO - add dropdown to selectTIME_CONTROLor blitz (update this in the path finding code)
// TODO - update rendering to show displayToUserChain (add animations) -->
// TODO - update usernameChain to a list of all users that have been tried so far



</script>

<template>
    <div id='six-degrees'>
        <HeroHeader svg="Connection" colour="#818CF8" secondaryText="See how you compare" mainText="Find your path" />
        <div class="pt-12 pb-16 flex justify-center gap-6 w-full">
            <input name=search spellCheck=false autocomplete=off
                class="w-full basis-2/4 inline-block text-white p-3 rounded-md border-2 border-slate-800 bg-slate-900 xl:text-xl xs:text-lg"
                type="text" placeholder="chess.com username" v-model="this.username" />
            <button
                class='inline-block bg-slate-900 border-slate-800 border-2 p-3 rounded-md xl:text-xl text-lg text-white hover:stroke-slate-50 stroke-slate-400 disabled:stroke-gray-500 disabled:opacity-60'
                @click="this.startUserChainSearch"
                :disabled="this.loading">
                <KingSvg />
            </button>
        </div>
        <DegreesPath :pathArray="this.userChain"/>
    </div>
</template>