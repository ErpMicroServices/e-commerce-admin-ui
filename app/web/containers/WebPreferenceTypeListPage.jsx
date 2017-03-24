import React from "react";
import {connect} from "react-redux";
import {compose, gql, graphql} from 'react-apollo';
import {PageHeader} from "bootstrap-react-components";
import constants from "../../constants";
import TypeListPage from "./TypeListPage";
import {List} from "../components/EditableList";
import WebPreferenceTypeForm from "../components/WebPreferenceTypeForm";
import WebPreferenceTypeView from "../components/WebPreferenceTypeView";
import WebPreferenceTypeGql from "../../graphql/web_preference_types.graphql";
import CreateWebPreferenceType from "../../graphql/create_web_preference_type.graphql";
import UpdateWebPreferenceType from "../../graphql/update_web_preference_type.graphql";
import DeleteWebPreferenceType from "../../graphql/delete_web_preference_type.graphql";

let {DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER} = constants;

class WebPreferenceTypeListPage extends TypeListPage {

    formComponent(item, save, cancel) {
        return (<WebPreferenceTypeForm item={item} extractItem={this.extractItem.bind(this)} save={save} cancel={cancel}/>);
    }

    get id() {
        return "WebPreferenceTypeList"
    }

    listFromProps() {      
        return this.props.list.web_preference_types;
    }

    get page_name() {
        return "Web Preference Types"
    };

    viewerComponent(item, startEditing, remove) {
        return <WebPreferenceTypeView item={item} edit={startEditing} remove={remove}/>;
    }

}

const WebPreferenceTypeListPageWithGql = compose(graphql(WebPreferenceTypeGql, {name: "list"}), graphql(CreateWebPreferenceType, {
    name: 'create',
    props: ({create}) => ({
        createQl: (item) => create({
            variables: {
                description: item.description
            },
            optimisticResponse: {
                "create_web_preference_type": {
                    "description": item.description,
                    "__typename": "WebPreferenceType"
                }
            },
            updateQueries: {
                "web_preference_types": (prev, {mutationResult}) => {
                    let newType = mutationResult.data.create_web_preference_type;
                    return Object.assign({}, prev, {
                        web_preference_types: [
                            ...prev.web_preference_types,
                            newType
                        ]
                    });
                }
            }
        })
    })
}), graphql(UpdateWebPreferenceType, {
    name: 'update',
    props: ({update}) => ({
        updateQl: ({id, description}) => update({
            variables: {
                id,
                description
            },
            optimisticResponse: {
                "update_web_preference_type": {
                    id,
                    description,
                    "__typename": "WebPreferenceType"
                }
            },
            updateQueries: {
                "web_preference_types": (prev, {mutationResult}) => {
                    let newType = mutationResult.data.update_web_preference_type;
                    console.log("mutationResult: ", mutationResult)
                    return Object.assign(prev, {
                        web_preference_types: prev.web_preference_types.map(i => i.id === newType.id
                            ? newType
                            : i)
                    });
                }
            }
        })
    })
}), graphql(DeleteWebPreferenceType, {
    name: 'remove',
    props: ({remove}) => ({
        removeQl: ({id}) => remove({
            variables: {
                id
            },
            optimisticResponse: {
                "delete_web_preference_type": {
                    id,
                    "__typename": "WebPreferenceType"
                }
            },
            updateQueries: {
                "web_preference_types": (prev, {mutationResult}) => {
                    let newType = mutationResult.data.delete_web_preference_type;
                    return Object.assign(prev, {
                        web_preference_types: prev.web_preference_types.filter(i => i.id !== newType.id)
                    });
                }
            }
        })
    })
}))(WebPreferenceTypeListPage);

export default connect(state => ({}), dispatch => ({
    showMessage: message => dispatch({
        type: DISPLAY_MESSAGE,
        payload: {
            context: MESSAGE_CONTEXT_DANGER,
            message: message.message
        }
    })
}))(WebPreferenceTypeListPageWithGql);
