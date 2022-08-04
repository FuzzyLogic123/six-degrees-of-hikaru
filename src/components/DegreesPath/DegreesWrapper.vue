
<script>

import KingSvg from '../svg/King.vue';
import HeroHeader from '.././HeroHeader.vue';
import DegreesPath from "./DegreesPath.vue";
// import { queryDatabase } from '../../firebaseConfig';
// import { fetchBestWin } from './functions';

export default {
    components: {
        HeroHeader,
        KingSvg,
        DegreesPath
    }
}


// TODO - decide whether to branch off users or just start from the start
// TODO - Prevent infinite loops/ cycles where players best wins go on forever (including when the backup suggests someone that will again cause an infinite loop)
// can be achieved by using ref to track list of players that have been tried so far, never use these to enter the list.
// TODO - add dropdown to selectTIME_CONTROLor blitz (update this in the path finding code)
// TODO - update rendering to show displayToUserChain (add animations) -->

// const MAX_REQUEST_ATTEMPTS = 1;

// function DegreesWrapper() {
//     const usernameTextRef = useRef("");
//     let alreadyTriedUsers = [];
//     // let userChain = [];

//     // TODO - update usernameChain to a list of all users that have been tried so far
//     const getMostRecentWin = async (username, timeControl) => {
//         const res = await fetch(`https://api.chess.com/pub/player/${username}/games/archives`);
//         const data = await res.json();
//         if (data.code === 0) {
//             console.log('the username entered does not exist');
//             return false;
//         }
//         else if (!data.archives.length) {
//             console.log('the user has not played any games');
//             return false;
//         }
//         for (let i = data.archives.length - 1; i >= 0; i--) {
//             const gameListHttpRequest = await fetch(data.archives[i]);
//             const gameList = await gameListHttpRequest.json();
//             const candidateGames = [];
//             for (let i = gameList.games.length - 1; i >= 0; i--) {
//                 const game = gameList.games[i];
//                 if (game.time_class === timeControl && game.white.result === 'win' && game.white.username.toLowerCase() === username.toLowerCase() && !alreadyTriedUsers.includes(game.black.username)) {
//                     candidateGames.push({
//                         username: game.black.username,
//                         rating: game.black.rating
//                     });
//                 } else if (game.time_class === timeControl && game.black.result === 'win' && game.black.username.toLowerCase() === username.toLowerCase() && !alreadyTriedUsers.includes(game.white.username)) {
//                     candidateGames.push({
//                         username: game.white.username,
//                         rating: game.white.rating
//                     });
//                 }
//             }
//             if (candidateGames.length > 0) {
//                 console.log(candidateGames);
//                 const highestRatedRecentOpponent = candidateGames.sort((a, b) => b.rating - a.rating)[0];
//                 console.log(highestRatedRecentOpponent.username, highestRatedRecentOpponent.rating);
//                 alreadyTriedUsers.push(highestRatedRecentOpponent.username);
//                 return highestRatedRecentOpponent.username;
//             } else {
//                 console.log("User has not won any games");
//             }
//         }
//     };

//     const getNextOptionHelper = async (timeControl) => {
//         const result = await getMostRecentWin(userChain.at(-1).next_player, timeControl);
//         if (!result) {
//             setUserChain(userChain => [userChain[0]]);
//             console.log("chain reset");
//             // console.log(userChain);
//             return await getNextOptionHelper(timeControl);
//         }
//         return result
//     }

//     const TIME_CONTROL = "bullet";
//     const [userChain, setUserChain] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const extendUserChain = async () => {
//         setIsLoading(true);
//         const mostRecentUser = userChain.at(-1);
//         if (mostRecentUser.name === "Hikaru Nakamura") {
//             // setUserChain(userChain);
//             console.log(userChain);
//             setIsLoading(false);
//             return userChain;
//         }
//         if (!mostRecentUser?.username) {
//             console.error("user does not have a username!");
//         }
//         // check database for user
//         console.log(mostRecentUser.username)
//         const databaseResult = await queryDatabase(mostRecentUser.username, TIME_CONTROL)
//         if (databaseResult) {
//             mostRecentUser.next_player = databaseResult.next_player;
//             console.log(databaseResult);
//             console.log('database returned next :  ' + databaseResult.next_player);
//         }

//         // request cloud function get game type from dropdown
//         const bestWin = await fetchBestWin(mostRecentUser.next_player, TIME_CONTROL, MAX_REQUEST_ATTEMPTS);
//         if (bestWin) {
//             userChain.push(bestWin);
//             console.log(userChain);
//             setUserChain(userChain);
//         } else {
//             const mostRecentWin = await getNextOptionHelper(TIME_CONTROL); //should basically always return someone unless every player in the chain has not won any games of that time control
//             console.log(mostRecentWin);
//             userChain.at(-1).next_player = mostRecentWin;
//         }
//         // await extendUserChain();
//     }

//     useEffect(() => {
//         extendUserChain();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [userChain])

//     useEffect(()=> {
//         startUserChainSearch();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isLoading])

//     const startUserChainSearch = async () => {
//         if (isLoading) { console.log("the thing was blocked"); return };
//         const USERNAME = usernameTextRef.current.value;
//         const firstUserData = await fetchBestWin(USERNAME, TIME_CONTROL, MAX_REQUEST_ATTEMPTS);
//         if (!firstUserData) {
//             console.error("invalid username");
//         }
//         if (!firstUserData?.next_player) {
//             const mostRecentWin = await getMostRecentWin(USERNAME, TIME_CONTROL);
//             if (mostRecentWin) {
//                 firstUserData.next_player = mostRecentWin;
//             } else {
//                 console.error("the player seems to have won no games within this time control");
//                 return;
//             }
//         }
//         setUserChain([firstUserData]);
//         // extendUserChain();
//     }
// }
</script>

<template>
        <div id='six-degrees'>
            <HeroHeader svg="Connection" colour="#818CF8" secondaryText="See how you compare" mainText="Find your path" />
            <div class="pt-12 pb-16 flex justify-center gap-6 w-full">
                <input name=search spellCheck=false class="basis-2/4 inline-block text-white p-3 rounded-md border-2 border-slate-800 bg-slate-900 xl:text-xl text-lg" type="text" placeholder="chess.com username" />
                <button class='inline-block bg-slate-900 border-slate-800 border-2 p-3 rounded-md xl:text-xl text-lg text-white hover:stroke-slate-50 stroke-slate-400'>
                    <KingSvg />
                </button>
            </div>
            <DegreesPath />
        </div>
</template>