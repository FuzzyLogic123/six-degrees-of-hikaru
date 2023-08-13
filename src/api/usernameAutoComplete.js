function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export const getUsernameAutoComplete = async (username) => {
    let res = {"member":[{"chess_title": "GM", "icon":"https://images.chesscomfiles.com/uploads/v1/user/87946966.1af761fe.70x70o.b1ec47b090b6.jpeg","title":"DaveKrause","url":"https://www.chess.com/member/davekrause","flair_code":"nothing","country_name":"United States","country_id":2},{"icon":"https://images.chesscomfiles.com/uploads/v1/user/107741300.405f21b2.70x70o.dd3146ed2d85.jpg","title":"DaveKlu","url":"https://www.chess.com/member/daveklu","flair_code":"mate","country_name":"United States","country_id":2},{"icon":"https://images.chesscomfiles.com/uploads/v1/user/111312616.a9c58281.70x70o.f23a0e73d28e.jpeg","title":"DaveBirch1984","url":"https://www.chess.com/member/davebirch1984","flair_code":"star_traditional","country_name":"Wales","country_id":166},{"icon":"https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif","title":"Davespawncollection","url":"https://www.chess.com/member/davespawncollection","flair_code":"crown_traditional","country_name":"Australia","country_id":17},{"icon":"https://images.chesscomfiles.com/uploads/v1/user/305498199.c693ddef.70x70o.e954fc4cd2c0.jpg","title":"Dave9202","url":"https://www.chess.com/member/dave9202","flair_code":"nothing","country_name":"Poland","country_id":112}]}
    res.member = res.member.slice(getRandomInt(res.member.length))
    return res

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