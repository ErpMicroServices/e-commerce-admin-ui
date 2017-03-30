import React from "react";
import {connect} from "react-redux";
import {compose, gql, graphql} from 'react-apollo';
import {PageHeader} from "bootstrap-react-components";
import constants from "../../constants";
import TypeListPage from "./TypeListPage";
import {List} from "../components/EditableList";
import TypeForm from "../components/TypeForm";
import TypeView from "../components/TypeView";
import WebContentSTatusTypeGql from "../../graphql/web_content_status_types.graphql";
import CreateWebContentSTatusType from "../../graphql/create_web_content_status_type.graphql";
import UpdateWebContentSTatusType from "../../graphql/update_web_content_status_type.graphql";
import DeleteWebContentSTatusType from "../../graphql/delete_web_content_status_type.graphql";

let {DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER} = constants;

class WebContentStatusTypeListPage extends TypeListPage {

    formComponent(item, save, cancel) {
        return <TypeForm item={item} extractItem={this.extractItem.bind(this)} save={save} cancel={cancel}/>
    }

    get id() {
        return "WebContentStatusTypeList"
    }

    listFromProps() {
        return this.props.list.web_content_status_types;
    }
    get page_name() {
        return "Web Content Status Types"
    };

    viewerComponent(item, startEditing, remove) {
        return <TypeView item={item} edit={startEditing} remove={remove}/>;
    }
}

let graphQlList = function() {
    return [
        graphql(WebContentSTatusTypeGql, {name: "list"}),
        graphql(CreateWebContentSTatusType, {
            name: 'create',
            props: ({create}) => ({
                createQl: (item) => create({
                    variables: {
                        description: item.description
                    },
                    optimisticResponse: {
                        "create_web_content_status_type": {
                            "description": item.description,
                            "__typename": "WebContentSTatusType"
                        }
                    },
                    updateQueries: {
                        "web_content_status_types": (prev, {mutationResult}) => {
                            let newType = mutationResult.data.create_web_content_status_type;
                            return Object.assign({}, prev, {
                                web_content_status_types: [
                                    ...prev.web_content_status_types,
                                    newType
                                ]
                            });
                        }
                    }
                })
            })
        }),
        graphql(UpdateWebContentSTatusType, {
            name: 'update',
            props: ({update}) => ({
                updateQl: ({id, description}) => update({
                    variables: {
                        id,
                        description
                    },
                    optimisticResponse: {
                        "update_web_content_status_type": {
                            id,
                            description,
                            "__typename": "WebContentSTatusType"
                        }
                    },
                    updateQueries: {
                        "web_content_status_types": (prev, {mutationResult}) => {
                            let newType = mutationResult.data.update_web_content_status_type;
                            return Object.assign(prev, {
                                web_content_status_types: prev.web_content_status_types.map(i => i.id === newType.id
                                    ? newType
                                    : i)
                            });
                        }
                    }
                })
            })
        }),
        graphql(DeleteWebContentSTatusType, {
            name: 'remove',
            props: ({remove}) => ({
                removeQl: ({id}) => remove({
                    variables: {
                        id
                    },
                    optimisticResponse: {
                        "delete_web_content_status_type": {
                            id,
                            "__typename": "WebContentSTatusType"
                        }
                    },
                    updateQueries: {
                        "web_content_status_types": (prev, {mutationResult}) => {
                            let newType = mutationResult.data.delete_web_content_status_type;
                            return Object.assign(prev, {
                                web_content_status_types: prev.web_content_status_types.filter(i => i.id !== newType.id)
                            });
                        }
                    }
                })
            })
        })
    ];
}

const WebContentStatusTypeListPageWithGql = compose(...graphQlList())(WebContentStatusTypeListPage);

export default connect(state => ({}), dispatch => ({
    showMessage: message => dispatch({
        type: DISPLAY_MESSAGE,
        payload: {
            context: MESSAGE_CONTEXT_DANGER,
            message: message.message
        }
    })
}))(WebContentStatusTypeListPageWithGql);
