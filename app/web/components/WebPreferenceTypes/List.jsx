import React from "react";
import { gql, graphql } from 'react-apollo';
import {ItemList} from "react-templates-and-utils";
import Editor from "./Editor";
import Description from "./Description";

class WebPreferenceTypeList extends React.Component {

    render() {
        let {list} = this.props;
        let displayList = list
            ? list.map((item, index) => <li key={index}>{item.description}</li>)
            : "There are no types";
        return (
            <div class="WebPreferenceTypeList">
                <ol>
                    {displayList}
                </ol>
            </div>
        );
    }
}

export default WebPreferenceTypeList;
