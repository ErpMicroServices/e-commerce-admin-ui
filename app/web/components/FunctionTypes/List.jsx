import React from "react";
import { gql, graphql } from 'react-apollo';
import {ItemList} from "react-templates-and-utils";
import Description from "./Description";

class FunctionTypeList extends React.Component {

    render() {
        let {list, update, remove} = this.props;
        let displayList = list
            ? list.map((item, index) => <Description item={item} key={index} save={update} remove={remove}/>)
            : "There are no types";
        return (
            <div class="FunctionTypeList">
                <ol>
                    {displayList}
                </ol>
            </div>
        );
    }
}

export default FunctionTypeList;
