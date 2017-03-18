import React from "react";
import {ItemDescription} from "react-templates-and-utils";
import {TextFormGroup, SaveButton} from "bootstrap-react-components";
import Editor from "./Editor";
import View from "./View";

class Description extends ItemDescription {
    editor(item) {
        return <Editor id={item.id} description={item.description} save={this.save.bind(this)} onListChange={this.props.onListChange}/>
    }

    viewer(item) {
        return <View id={item.id || "new"} description={item.description} edit={this.editing.bind(this)} remove={this.remove.bind(this)} allowEditing={this.state.allowEditing}/>;
    }

}

export default Description;
