import React from "react";
import {TextFormGroup, SaveButton} from "bootstrap-react-components";

class Description extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    startEditing(e) {
        this.setState({editing: true});
    }

    remove() {
        this.props.remove(this.props.item);
    }

    render() {
        let {editing} = this.state;
        let {item, formComponent, viewerComponent} = this.props;
        let element = (editing)
            ? formComponent(item, this.save.bind(this))
            : viewerComponent(item, this.startEditing.bind(this), this.remove.bind(this));
        return element;
    }

    save(item) {
        this.setState({editing: false});
        this.props.save(item);
    }

}

export default Description;
