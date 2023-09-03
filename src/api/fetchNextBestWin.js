export async function fetchBestWin(username, timeControl, retryAttempts = 0) {
    const controller = new AbortController();
    try {
        const timeout = setTimeout(() => controller.abort(), 10000);
        const res = await fetch("https://us-central1-six-degrees-of-hikaru-cf099.cloudfunctions.net/scraper", {
            method: 'POST',
            body: JSON.stringify({
                "text": `https://www.chess.com/stats/live/${timeControl}/${username}/0` // /0 queries all time page
            }),
            signal: controller.signal
        });
        clearTimeout(timeout);
        if (!res.ok) {
            throw new Error(`Request failed with status: ${res.status}`);
        }
        return res.json();
    } catch (e) {
        if (retryAttempts > 0) {
            return fetchBestWin(username, timeControl, retryAttempts - 1);
        }
        console.error(e.message);
        return null;
    }
}