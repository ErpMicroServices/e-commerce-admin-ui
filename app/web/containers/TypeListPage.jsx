import React from "react";
import {connect} from "react-redux";
import {compose, gql, graphql} from 'react-apollo';
import {PageHeader} from "bootstrap-react-components";
import constants from "../../constants";
import {List} from "../components/EditableList";

let {DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER} = constants;

class TypeListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFormShow: false
        }
    }

    create(item) {
        this.props.createQl(item).then(({data}) => {
            this.setState({addFormShow: false});
            return data;
        }).catch(error => this.props.showMessage(error));
    }

    extractItem(bigObject) {
        if (bigObject.item) {
            return bigObject.item;
        } else {
            return {id: bigObject.id, description: bigObject.description};
        }
    }

    get id() {
        return "List"
    };

    listFromProps() {
        return this.props.list;
    }

    get page_name() {
        return "Some List"
    };

    remove(item) {
        this.props.removeQl(item).catch(error => this.props.showMessage(error));
    }

    render() {
        let {list} = this.props;
        let mainDisplay = list.loading
            ? <p>Still loading....</p>
            : <List id={this.id} formComponent={this.formComponent.bind(this)} list={this.listFromProps()} extractItem={this.extractItem.bind(this)} remove={this.props.removeQl.bind(this)} update={this.update.bind(this)} viewerComponent={this.viewerComponent.bind(this)}/>;
        let addForm = this.state.addFormShow
            ? this.formComponent({
                id: '',
                description: ''
            }, this.create.bind(this))
            : <button id={`add${this.id}Button`} class="btn btn-default" onClick={this.showAdd.bind(this)}>
                <span class="glyphicon glyphicon-plus" aria-hidden="true"/>
                Add
            </button>;
        return (
            <div id={`${this.id}ListPage`}>
                <PageHeader id={`${this.id}ListPage`}>
                    <h1>{this.page_name}</h1>
                </PageHeader>

                {addForm}
                {mainDisplay}
            </div>
        );
    }

    showAdd = () => {
        this.setState({addFormShow: true})
    }

    update(item) {
        this.props.updateQl(item).catch(error => this.props.showMessage(error));
    }
}

export default TypeListPage;
