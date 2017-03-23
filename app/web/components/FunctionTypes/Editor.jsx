import React from "react";
import {ItemEditor} from "react-templates-and-utils";
import {TextFormGroup, SaveButton} from "bootstrap-react-components";

class Editor extends ItemEditor {

    descriptionChange(e) {
        this.setState({description: e.target.value})
    }

    propsToState(props) {
        let {id, description} = props;
        this.setState({id, description})
    }

    render() {
        let {id, description} = this.state;
        return (
            <div class="FunctionTypeEditor">
                <TextFormGroup label="Description" id={id + "Description"} onChange={this.descriptionChange.bind(this)} value={description}/>
                <button id="saveFunctionTypeDescriptionButton" type="button" class="btn btn-primary" onClick={this.save.bind(this)}>Save
                </button>
                <button type="button" class="btn btn-default" onClick={this.cancel.bind(this)}>Cancel</button>
            </div>
        )
    }

    stateToItem() {
        let {id, description} = this.state;
        return {id, description};
    }
}

export default Editor;
