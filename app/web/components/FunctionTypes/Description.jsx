import React from "react";
import {ItemDescription} from "react-templates-and-utils";
import {TextFormGroup, SaveButton} from "bootstrap-react-components";
import Editor from "./Editor";
import View from "./View";

class Description extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    componentWillMount() {
        this.propsToState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.propsToState(nextProps);
    }

    startEditing(e) {
        this.setState({editing: true});
    }

    editorComponent(item) {
        return <Editor id={item.id} description={item.description} save={this.save.bind(this)}/>
    }

    propsToState(props) {
        let {item} = props;
        this.setState({item});
    }

    remove() {
        this.props.remove(this.state.item);
    }

    render() {
        let {item, editing} = this.state;
        let element = (editing)
            ? this.editorComponent(item)
            : this.viewerComponent(item);
        return element;
    }

    save(item) {
        this.setState({editing: false});
        this.props.save(item);
    }

    viewerComponent(item) {
        return <View id={item.id || "new"}
                      description={item.description}
                      edit={this.startEditing.bind(this)}
                      remove={this.remove.bind(this)}/>;
    }

}

export default Description;
