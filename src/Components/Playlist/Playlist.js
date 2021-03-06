import { React, Component } from 'react';
import "./Playlist.css";

import TrackList from '../TrackList/TrackList';

export default class Playlist extends Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        const name = e.target.value;
        this.props.onNameChange(name);
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue="New Playlist" onChange={this.handleNameChange} />
                <TrackList parentName="playlist" tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}