import { React, Component } from 'react';
import "./Track.css";

export class Track extends Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }

    renderAction() {
        let buttonString = "+";
        if (this.props.isRemoval) { buttonString = "-"; }
        return buttonString;
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist}| {this.props.track.album}</p>
                </div>
                <button className="Track-action" onClick={this.addTrack} >{this.renderAction()}</button>
            </div>
        );
    }
}