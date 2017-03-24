import React from "react";
import {TextFormGroup, SaveButton} from "bootstrap-react-components";
import Form from "./EditableList/Form";

class WebPreferenceTypeForm extends Form {


    descriptionChange(e) {
        this.setState({description: e.target.value})
    }

    formFields() {
        let {id, description} = this.state;
        return <TextFormGroup label="Web Preference Type Description" id={id + "Description"} onChange={this.descriptionChange.bind(this)} value={description}/>
    }

}

export default WebPreferenceTypeForm;
