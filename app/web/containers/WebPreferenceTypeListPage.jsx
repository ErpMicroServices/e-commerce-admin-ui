import React from "react";
import { gql, graphql } from 'react-apollo';
import {PageHeader} from "bootstrap-react-components";
import {load as loadData, add} from "../../actions";
import {WebPreferenceTypeList} from "../components/WebPreferenceTypes";
import WebPreferenceTypeGql from "../../graphql/WebPreferenceTypeList.graphql";

class WebPreferenceTypeListPage extends React.Component {

    constructor(props) {
        super(props);
    }

    onListChange(list) {
        this.setState({list});
    }

    add(item) {

    }
    render() {
      console.log("this.props: ", this.props);
        let {data} = this.props;
        return (
            <div id="WebPreferenceTypeListPage">
                <PageHeader id="WebPreferenceTypeListPage">
                    <h1>Web Preference Types</h1>
                </PageHeader>
                <WebPreferenceTypeList
                  add={this.add.bind(this)}
                  allowEditing={true}
                  list={data.web_preference_types}
                  onListChange={this.onListChange.bind(this)}/>
            </div>
        );
    }
}

// const WebPreferenceTypeGql = gql`{web_preference_types { id description }}`;

export default graphql(WebPreferenceTypeGql)(WebPreferenceTypeListPage);
