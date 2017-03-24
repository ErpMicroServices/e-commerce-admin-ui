import React from "react";
import {RowControlButtons} from "bootstrap-react-components";

class View extends React.Component {

  id () { return ""}

  content() {return ""}

  render() {
    let {edit, remove, save} = this.props;
    return (
        <li id={`id${this.id()}`}>
          {this.content()}&nbsp;&nbsp;
          <RowControlButtons id={`id${this.id()}`}
                                  edit={edit}
                                  save={save}
                                  remove={remove}/>
        </li>
    )
  }
}

export default View;
