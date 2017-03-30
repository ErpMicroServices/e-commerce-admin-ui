import React from "react";
import {connect} from "react-redux";
import {compose, gql, graphql} from 'react-apollo';
import {PageHeader} from "bootstrap-react-components";
import constants from "../../constants";
import TypeListPage from "./TypeListPage";
import {List} from "../components/EditableList";
import TypeForm from "../components/TypeForm";
import TypeView from "../components/TypeView";
import WebContentTypeGql from "../../graphql/web_content_types.graphql";
import CreateWebContentType from "../../graphql/create_web_content_type.graphql";
import UpdateWebContentType from "../../graphql/update_web_content_type.graphql";
import DeleteWebContentType from "../../graphql/delete_web_content_type.graphql";

let {DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER} = constants;

class WebContentTypeListPage extends TypeListPage {

    formComponent(item, save, cancel) {
        return <TypeForm item={item} extractItem={this.extractItem.bind(this)} save={save} cancel={cancel}/>
    }

    get id() {
        return "WebContentTypeList"
    }

    listFromProps() {
        return this.props.list.web_content_types;
    }
    get page_name() {
        return "Web Content Types"
    };

    viewerComponent(item, startEditing, remove) {
        return <TypeView item={item} edit={startEditing} remove={remove}/>;
    }
}

let graphQlList = function() {
    return [
        graphql(WebContentTypeGql, {name: "list"}),
        graphql(CreateWebContentType, {
            name: 'create',
            props: ({create}) => ({
                createQl: (item) => create({
                    variables: {
                        description: item.description
                    },
                    optimisticResponse: {
                        "create_web_content_type": {
                            "description": item.description,
                            "__typename": "WebContentType"
                        }
                    },
                    updateQueries: {
                        "web_content_types": (prev, {mutationResult}) => {
                            let newType = mutationResult.data.create_web_content_type;
                            return Object.assign({}, prev, {
                                web_content_types: [
                                    ...prev.web_content_types,
                                    newType
                                ]
                            });
                        }
                    }
                })
            })
        }),
        graphql(UpdateWebContentType, {
            name: 'update',
            props: ({update}) => ({
                updateQl: ({id, description}) => update({
                    variables: {
                        id,
                        description
                    },
                    optimisticResponse: {
                        "update_web_content_type": {
                            id,
                            description,
                            "__typename": "WebContentType"
                        }
                    },
                    updateQueries: {
                        "web_content_types": (prev, {mutationResult}) => {
                            let newType = mutationResult.data.update_web_content_type;
                            return Object.assign(prev, {
                                web_content_types: prev.web_content_types.map(i => i.id === newType.id
                                    ? newType
                                    : i)
                            });
                        }
                    }
                })
            })
        }),
        graphql(DeleteWebContentType, {
            name: 'remove',
            props: ({remove}) => ({
                removeQl: ({id}) => remove({
                    variables: {
                        id
                    },
                    optimisticResponse: {
                        "delete_web_content_type": {
                            id,
                            "__typename": "WebContentType"
                        }
                    },
                    updateQueries: {
                        "web_content_types": (prev, {mutationResult}) => {
                            let newType = mutationResult.data.delete_web_content_type;
                            return Object.assign(prev, {
                                web_content_types: prev.web_content_types.filter(i => i.id !== newType.id)
                            });
                        }
                    }
                })
            })
        })
    ];
}

const WebContentTypeListPageWithGql = compose(...graphQlList())(WebContentTypeListPage);

export default connect(state => ({}), dispatch => ({
    showMessage: message => dispatch({
        type: DISPLAY_MESSAGE,
        payload: {
            context: MESSAGE_CONTEXT_DANGER,
            message: message.message
        }
    })
}))(WebContentTypeListPageWithGql);
