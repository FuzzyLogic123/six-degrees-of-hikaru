function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export const fetchUsernameAutoComplete = async (username) => {
    try {
        const response = await fetch(`https://us-central1-six-degrees-of-hikaru-cf099.cloudfunctions.net/autocomplete/${encodeURIComponent(username)}`);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Could not fetch autocomplete options:', error);
        return null; 
    }
}