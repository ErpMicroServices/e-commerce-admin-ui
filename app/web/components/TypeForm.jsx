import React from "react";
import {TextFormGroup, SaveButton} from "bootstrap-react-components";
import Form from "./EditableList/Form";

class TypeForm extends Form {


    descriptionChange(e) {
        this.setState({description: e.target.value})
    }

    formFields() {
        let {id, description} = this.state;
        return <TextFormGroup label="Description" id={id + "Description"} onChange={this.descriptionChange.bind(this)} value={description}/>
    }

}

export default TypeForm;
