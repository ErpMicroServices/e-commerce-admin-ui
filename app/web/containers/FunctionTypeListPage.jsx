import React from "react";
import {connect} from "react-redux";
import {compose, gql, graphql} from 'react-apollo';
import {PageHeader} from "bootstrap-react-components";
import constants from "../../constants";
import {load as loadData, add} from "../../actions";
import {FunctionTypeList, FunctionTypeEditor} from "../components/FunctionTypes";
import FunctionTypeGql from "../../graphql/function_types.graphql";
import CreateFunctionType from "../../graphql/create_function_type.graphql";
import UpdateFunctionType from "../../graphql/update_function_type.graphql";
import DeleteFunctionType from "../../graphql/delete_function_type.graphql";

let {DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER} = constants;

class FunctionTypeListPage extends React.Component {

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

    remove(item) {
        this.props.removeQl(item).catch(error => this.props.showMessage(error));
    }

    render() {
        let {list} = this.props;
        let mainDisplay = list.loading
            ? <p>Still loading....</p>
            : <FunctionTypeList list={list.function_types} update={this.update.bind(this)} remove={this.props.removeQl.bind(this)}/>;
        let addForm = this.state.addFormShow
            ? <FunctionTypeEditor id={""} description={""} save={this.create.bind(this)}/>
          : <button id="addFunctionTypeButton" class="btn btn-default" onClick={this.showAdd.bind(this)}>
                <span class="glyphicon glyphicon-plus" aria-hidden="true"/>
                Add
            </button>;
        return (
            <div id="FunctionTypeListPage">
                <PageHeader id="FunctionTypeListPage">
                    <h1>Function Types</h1>
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
        this.props.updateQl(item)
        .catch(error => this.props.showMessage(error));
    }
}

const FunctionTypeListPageWithGql = compose(graphql(FunctionTypeGql, {name: "list"}), graphql(CreateFunctionType, {
    name: 'create',
    props: ({create}) => ({
        createQl: (item) => create({
            variables: {
                description: item.description
            },
            optimisticResponse: {
                "create_function_type": {
                    "description": item.description,
                    "__typename": "FunctionType"
                }
            },
            updateQueries: {
                "function_types": (prev, {mutationResult}) => {
                    let newType = mutationResult.data.create_function_type;
                    return Object.assign({}, prev, {
                        function_types: [
                            ...prev.function_types,
                            newType
                        ]
                    });
                }
            }
        })
    })
}), graphql(UpdateFunctionType, {
    name: 'update',
    props: ({update}) => ({
        updateQl: ({id, description}) => update({
            variables: {
                id,
                description
            },
            optimisticResponse: {
                "update_function_type": {
                    id,
                    description,
                    "__typename": "FunctionType"
                }
            },
            updateQueries: {
                "function_types": (prev, {mutationResult}) => {
                    let newType = mutationResult.data.update_function_type;
                    console.log("mutationResult: ", mutationResult)
                    return Object.assign(prev, {
                        function_types: prev.function_types.map(i => i.id === newType.id
                            ? newType
                            : i)
                    });
                }
            }
        })
    })
}), graphql(DeleteFunctionType, {
    name: 'remove',
    props: ({remove}) => ({
        removeQl: ({id}) => remove({
            variables: {
                id
            },
            optimisticResponse: {
                "delete_function_type": {
                    id,
                    "__typename": "FunctionType"
                }
            },
            updateQueries: {
                "function_types": (prev, {mutationResult}) => {
                    let newType = mutationResult.data.delete_function_type;
                    return Object.assign(prev, {
                        function_types: prev.function_types.filter(i => i.id !== newType.id)
                    });
                }
            }
        })
    })
}))(FunctionTypeListPage);

export default connect(state => ({}), dispatch => ({
    showMessage: message => dispatch({
        type: DISPLAY_MESSAGE,
        payload: {
            context: MESSAGE_CONTEXT_DANGER,
            message: message.message
        }
    })
}))(FunctionTypeListPageWithGql);
