let accessToken;
const clientId = '193957034d294928a1c3c76c09466fd5'; // Your client id
const redirecUri = 'http://soylumu.surge.sh';
// const redirecUri = 'http://localhost:3000/';

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
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirecUri}`;
            window.location = accessURL;
        }
    }
};

Spotify.search = (query) => {
    const url = `https://api.spotify.com/v1/search?type=track&q=${query}`;
    return fetch(url, {
        headers: { Authorization: `Bearer ${Spotify.getAccessToken()}` }
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        if (!jsonResponse.tracks) {
            return [];
        }

        return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    });
};

Spotify.savePlaylist = (name, playlist) => {
    const headers = { Authorization: `Bearer ${Spotify.getAccessToken()}` };
    let userID;

    const url = "https://api.spotify.com/v1/me";
    return fetch(url, { headers: headers }).then((response) => {
        return response.json();
    }).then((JSONresponse) => {
        userID = JSONresponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ name: name })
        })
    }).then((response) => {
        return response.json();
    }).then((playlistJSON) => {
        const playlistID = playlistJSON.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ uris: playlist })
        })
    }).then((response) => {
        return response.json();
    }).then((response) => {
        if (response) {
            return true;
        }
        return false;
    }).catch((error) => {
        console.log(error.message);
    });


};

module.exports = Spotify;