export async function fetchBestWin(username, timeControl) {
    try {
        const res = await fetch("https://us-central1-six-degrees-of-hikaru-cf099.cloudfunctions.net/scraper", {
            method: 'POST',
            body: JSON.stringify({
                "text": `https://www.chess.com/stats/live/${timeControl}/${username}/0` // /0 queries all time page
            })
        });
        const response = await res.json();
        return response;
    } catch (e) {
        console.error(e.message);
    }
}