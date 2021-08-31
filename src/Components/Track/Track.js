import { React, Component } from 'react';
import "./Track.css";

export class Track extends Component {
    renderAction() {
        let buttonString = "+";
        if (this.props.isRemoval) { buttonString = "-"; }
        return (
            <button className="Track-action">{buttonString}</button>
        );
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3><!-- track name will go here --></h3>
                    <p><!-- track artist will go here--> | <!-- track album will go here --></p>
                </div>
                <button className="Track-action"><!-- + or - will go here --></button>
            </div>
        );
    }
}