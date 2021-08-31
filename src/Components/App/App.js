import React from 'react';
import "./App.css";

import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
      successOnSave: null
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.includes(track)) {
      const newPlaylistTracks = this.state.playlistTracks;
      newPlaylistTracks.push(track);
      this.setState({ playlistTracks: newPlaylistTracks });
    }
  }

  removeTrack(track) {
    const index = this.state.playlistTracks.indexOf(track);
    if (index > -1) {
      const newPlaylistTracks = this.state.playlistTracks;
      newPlaylistTracks.splice(index, 1);
      this.setState({ playlistTracks: newPlaylistTracks });
    }
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then((success) => {
      if (success) {
        this.setState({ playlistName: "New Playlist", playlistTracks: [], success: true });
      } else {
        this.setState({ success: false });
      }
    });
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }

  search(term) {
    Spotify.search(term).then(searchResults => this.setState({ searchResults: searchResults }));
  }

  closeAlert() {
    this.setState({ success: null });
  }

  render() {
    let alert;
    if (this.state.success === null || typeof this.state.success === "undefined") {
      alert = false;
    }
    else if (this.state.success) {
      alert = (
        <Alert severity="success" onClose={() => { this.closeAlert(); }}>
          <AlertTitle>Success</AlertTitle>
          Sucessfully saved the playlist.
        </Alert>
      );
    } else {
      alert = (
        <Alert severity="error" onClose={() => { this.closeAlert(); }}>
          <AlertTitle>Error</AlertTitle>
          Error while saving the playlist!
        </Alert>
      );
    }
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          {alert && alert}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}
