<script>
const fetchBestWin = async (username, timeControl, requestAttemps) => {
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
            console.log(response);
            return response;
        } catch (e) {
            console.log(e);
            await fetchBestWin(username, timeControl, requestAttemps - 1);
        }
    } else {
        return false;
    }
}

export { fetchBestWin };

</script>

