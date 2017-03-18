import React from "react";
import {RowControlButtons} from "bootstrap-react-components";

class View extends React.Component {

  render() {
    let {id, description} = this.props;
    return (
        <li id={id}>{description}</li>
    )
  }
}

export default View;
