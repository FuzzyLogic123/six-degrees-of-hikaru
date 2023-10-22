

export async function fetchUsername(username) {
    try {
        // timeout the request after 5 seconds
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 5000);

        const res = await fetch(`https://api.chess.com/pub/player/${username}`, { signal: controller.signal });
        const data = await res.json();
        if (data.code === 0) {
            return false;
        } else {
            return {
                avatar: data.avatar,
                name: data.name
            };
        }
    } catch {
        console.error("chess.com username verification failed");
        //even if error check failed, still continue
        return true;
    }
}