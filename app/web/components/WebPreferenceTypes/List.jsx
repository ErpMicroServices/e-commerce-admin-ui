import React from "react";
import { gql, graphql } from 'react-apollo';
import {ItemList} from "react-templates-and-utils";
import Editor from "./Editor";
import Description from "./Description";

class WebPreferenceTypeList extends ItemList {

    create(item) {
      this.props.add(item);
      // super.addToList(item);
    }

    render() {
        let {list, allowEditing} = this.state;
        let addButton = this.buttonEditOrNothing("Add Type", <Editor save={this.create.bind(this)}/>);
        let displayList = list
            ? list.map((item, index) => <Description key={index}
                                                        item={item}
                                                        save={this.add.bind(this)}
                                                        remove={this.removeItem.bind(this)}
                                                        allowEditing={allowEditing}/>)
            : "There are no types";
        return (
            <div class="WebPreferenceTypeList">
                {addButton}
                <ul>
                    {displayList}
                </ul>
            </div>
        );
    }
}

const webPreferenceListQl = gql`{ web_preference_types {id,description}}`;

export default graphql(webPreferenceListQl)(WebPreferenceTypeList);
