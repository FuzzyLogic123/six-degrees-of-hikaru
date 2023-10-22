import { logEvent } from '@firebase/analytics';
import { analytics } from '@/firebaseConfig';

export async function fetchGameArchives(username) {
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
    return data;
}
