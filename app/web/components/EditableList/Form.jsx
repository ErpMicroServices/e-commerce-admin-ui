import React from "react";
import {TextFormGroup, SaveButton} from "bootstrap-react-components";

class Form extends React.Component {

    cancel() {
        this.props.cancel();
    }

    componentWillMount() {
        this.setState(this.props.extractItem(this.props));
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.props.extractItem(this.props));
    }

    render() {
        return (
            <div>
                {this.formFields()}
                <button type="button" class="save-button btn btn-primary" onClick={this.save.bind(this)}>Save
                </button>
                <button type="button" class="cancel-button btn btn-default" onClick={this.cancel.bind(this)}>Cancel</button>
            </div>
        )
    }

    save(event) {
        event.preventDefault();
        this.props.save(this.props.extractItem(this.state));
    }

}

export default Form;
