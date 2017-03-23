import React from "react";
import {RowControlButtons} from "bootstrap-react-components";

class View extends React.Component {

  render() {
    let {id, description, edit, remove, save} = this.props;
    return (
        <li id={`id${id}`}>
          {description}&nbsp;
          <RowControlButtons id={`id${id}`}
                                  editing={false}
                                  edit={edit}
                                  save={save}
                                  remove={remove}/>
        </li>
    )
  }
}

export default View;
