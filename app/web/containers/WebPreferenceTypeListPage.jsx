import React from "react";
import {compose, gql, graphql} from 'react-apollo';
import {PageHeader} from "bootstrap-react-components";
import {load as loadData, add} from "../../actions";
import {WebPreferenceTypeList, WebPreferenceTypeEditor} from "../components/WebPreferenceTypes";
import WebPreferenceTypeGql from "../../graphql/WebPreferenceTypeList.graphql";
import CreateWebPreferenceType from "../../graphql/CreateWebPreferenceType.graphql";

class WebPreferenceTypeListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addFormShow: false
        }
    }

    create(item) {
        this.props.createWPT(item)
        .then(({data}) => {
            this.setState({addFormShow: false});
            return data;
        })
        .catch((error) => console.log("error: ", error));
    }

    render() {
        let {list} = this.props;
        let mainDisplay = list.loading
            ? <p>Still loading....</p>
            : <WebPreferenceTypeList list={list.web_preference_types}/>;
        let addForm = this.state.addFormShow
            ? <WebPreferenceTypeEditor id={""} description={""} save={this.create.bind(this)}/>
            : <button class="btn btn-default" onClick={this.showAdd.bind(this)}>
                <span class="glyphicon glyphicon-plus" aria-hidden="true"/>
                Add
            </button>;
        return (
            <div id="WebPreferenceTypeListPage">
                <PageHeader id="WebPreferenceTypeListPage">
                    <h1>Web Preference Types</h1>
                </PageHeader>

                {addForm}
                {mainDisplay}
            </div>
        );
    }

    showAdd = () => {
        this.setState({addFormShow: true})
    }
}

export default compose(graphql(WebPreferenceTypeGql, {name: "list"}), graphql(CreateWebPreferenceType, {
    name: 'create',
    props: ({create}) => ({
        createWPT: (item) => create({
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
                "WebPreferenceTypeList": (prev, {mutationResult}) => {
                    let newType = mutationResult.data.create_web_preference_type;
                    return Object.assign(prev, {
                        web_preference_types: [
                            ...prev.web_preference_types,
                            newType
                        ]
                    });
                }
            }
        })
    })
}))(WebPreferenceTypeListPage);
