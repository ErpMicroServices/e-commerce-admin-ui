import React from "react";
import {connect} from "react-redux";
import {compose, gql, graphql} from 'react-apollo';
import {PageHeader} from "bootstrap-react-components";
import constants from "../../constants";
import TypeListPage from "./TypeListPage";
import {List} from "../components/EditableList";
import WebContentRoleTypeForm from "../components/WebContentRoleTypeForm";
import WebContentRoleTypeView from "../components/WebContentRoleTypeView";
import WebContentRoleTypeGql from "../../graphql/web_content_role_types.graphql";
import CreateWebContentRoleType from "../../graphql/create_web_content_role_type.graphql";
import UpdateWebContentRoleType from "../../graphql/update_web_content_role_type.graphql";
import DeleteWebContentRoleType from "../../graphql/delete_web_content_role_type.graphql";

let {DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER} = constants;

class WebContentRoleTypeListPage extends TypeListPage {

    formComponent(item, save, cancel) {
        return <WebContentRoleTypeForm item={item} extractItem={this.extractItem.bind(this)} save={save} cancel={cancel}/>
    }

    get id() {
        return "WebContentRoleTypeList"
    }

    listFromProps() {
        return this.props.list.web_content_role_types;
    }
    get page_name() {
        return "Web Content Role Types"
    };

    viewerComponent(item, startEditing, remove) {
        return <WebContentRoleTypeView item={item} edit={startEditing} remove={remove}/>;
    }
}

let graphQlList = function() {
    return [
        graphql(WebContentRoleTypeGql, {name: "list"}),
        graphql(CreateWebContentRoleType, {
            name: 'create',
            props: ({create}) => ({
                createQl: (item) => create({
                    variables: {
                        description: item.description
                    },
                    optimisticResponse: {
                        "create_web_content_role_type": {
                            "description": item.description,
                            "__typename": "WebContentRoleType"
                        }
                    },
                    updateQueries: {
                        "web_content_role_types": (prev, {mutationResult}) => {
                            let newType = mutationResult.data.create_web_content_role_type;
                            return Object.assign({}, prev, {
                                web_content_role_types: [
                                    ...prev.web_content_role_types,
                                    newType
                                ]
                            });
                        }
                    }
                })
            })
        }),
        graphql(UpdateWebContentRoleType, {
            name: 'update',
            props: ({update}) => ({
                updateQl: ({id, description}) => update({
                    variables: {
                        id,
                        description
                    },
                    optimisticResponse: {
                        "update_web_content_role_type": {
                            id,
                            description,
                            "__typename": "WebContentRoleType"
                        }
                    },
                    updateQueries: {
                        "web_content_role_types": (prev, {mutationResult}) => {
                            let newType = mutationResult.data.update_web_content_role_type;
                            return Object.assign(prev, {
                                web_content_role_types: prev.web_content_role_types.map(i => i.id === newType.id
                                    ? newType
                                    : i)
                            });
                        }
                    }
                })
            })
        }),
        graphql(DeleteWebContentRoleType, {
            name: 'remove',
            props: ({remove}) => ({
                removeQl: ({id}) => remove({
                    variables: {
                        id
                    },
                    optimisticResponse: {
                        "delete_web_content_role_type": {
                            id,
                            "__typename": "WebContentRoleType"
                        }
                    },
                    updateQueries: {
                        "web_content_role_types": (prev, {mutationResult}) => {
                            let newType = mutationResult.data.delete_web_content_role_type;
                            return Object.assign(prev, {
                                web_content_role_types: prev.web_content_role_types.filter(i => i.id !== newType.id)
                            });
                        }
                    }
                })
            })
        })
    ];
}

const WebContentRoleTypeListPageWithGql = compose(...graphQlList())(WebContentRoleTypeListPage);

export default connect(state => ({}), dispatch => ({
    showMessage: message => dispatch({
        type: DISPLAY_MESSAGE,
        payload: {
            context: MESSAGE_CONTEXT_DANGER,
            message: message.message
        }
    })
}))(WebContentRoleTypeListPageWithGql);
