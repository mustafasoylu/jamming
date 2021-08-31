let accessToken;
const clientId = '193957034d294928a1c3c76c09466fd5'; // Your client id
const redirecUri = 'http://localhost:3000/';

const Spotify = {};

Spotify.getAccessToken = () => {
    if (accessToken) {
        return accessToken;
    } else {
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresMatch = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenMatch && expiresMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            const accessURL = `https;://accounts.spotify.com/authorize?client_id${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirecUri}`;
            window.location = accessURL;
        }
    }
};

module.exports = Spotify;