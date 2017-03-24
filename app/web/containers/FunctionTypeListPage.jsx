import React from "react";
import {connect} from "react-redux";
import {compose, gql, graphql} from 'react-apollo';
import {PageHeader} from "bootstrap-react-components";
import constants from "../../constants";
import TypeListPage from "./TypeListPage";
import {List} from "../components/EditableList";
import FunctionTypeForm from "../components/FunctionTypeForm";
import FunctionTypeView from "../components/FunctionTypeView";
import FunctionTypeGql from "../../graphql/function_types.graphql";
import CreateFunctionType from "../../graphql/create_function_type.graphql";
import UpdateFunctionType from "../../graphql/update_function_type.graphql";
import DeleteFunctionType from "../../graphql/delete_function_type.graphql";

let {DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER} = constants;

class FunctionTypeListPage extends TypeListPage {

    formComponent(item, save, cancel) {
        return <FunctionTypeForm item={item} extractItem={this.extractItem.bind(this)} save={save} cancel={cancel}/>
    }

    get id() {
        return "FunctionTypeList"
    }

    listFromProps() {
        return this.props.list.function_types;
    }
    get page_name() {
        return "Function Types"
    };

    viewerComponent(item, startEditing, remove) {
        return <FunctionTypeView item={item} edit={startEditing} remove={remove}/>;
    }
}

let graphQlList = function() {
    return [
        graphql(FunctionTypeGql, {name: "list"}),
        graphql(CreateFunctionType, {
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
        }),
        graphql(UpdateFunctionType, {
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
                            return Object.assign(prev, {
                                function_types: prev.function_types.map(i => i.id === newType.id
                                    ? newType
                                    : i)
                            });
                        }
                    }
                })
            })
        }),
        graphql(DeleteFunctionType, {
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
        })
    ];
}

const FunctionTypeListPageWithGql = compose(...graphQlList())(FunctionTypeListPage);

export default connect(state => ({}), dispatch => ({
    showMessage: message => dispatch({
        type: DISPLAY_MESSAGE,
        payload: {
            context: MESSAGE_CONTEXT_DANGER,
            message: message.message
        }
    })
}))(FunctionTypeListPageWithGql);
