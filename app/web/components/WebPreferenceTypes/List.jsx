import React from "react";
import { gql, graphql } from 'react-apollo';
import {ItemList} from "react-templates-and-utils";
import Description from "./Description";

class WebPreferenceTypeList extends React.Component {

    render() {
        let {list, update} = this.props;
        let displayList = list
            ? list.map((item, index) => <Description item={item} key={index} save={update}/>)
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
