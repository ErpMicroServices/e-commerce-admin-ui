import React from "react";
import {gql, graphql} from 'react-apollo';
import {ItemList} from "react-templates-and-utils";
import Display from "./Display";

class List extends React.Component {

    render() {
        let {
            id,
            formComponent,
            list,
            update,
            remove,
            viewerComponent
        } = this.props;
        let displayList = list
            ? list.map((item, index) => <Display formComponent={formComponent} id={id} item={item} key={index} extractItem={this.props.extractItem} save={update} remove={remove} viewerComponent={viewerComponent}/>)
            : <p>"There are no types"</p>;
        return (
            <ol id={`${id}List`} class="EditableList">
                {displayList}
            </ol>
        );
    }

}

export default List;
