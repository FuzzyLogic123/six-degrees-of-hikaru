export async function fetchBestWin(username, timeControl) {
    try {
        const res = await fetch("https://us-central1-six-degrees-of-hikaru-cf099.cloudfunctions.net/scraper", {
            method: 'POST',
            body: JSON.stringify({
                "text": `https://www.chess.com/stats/live/${timeControl}/${username}/0` // /0 queries all time page
            })
        });
        if (!res.ok) {
            throw new Error(`Request failed with status: ${res.status}`);
        }
        return res.json();
    } catch (e) {
        console.error(e.message);
        return null;
    }
}