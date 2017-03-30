import {View} from "./EditableList";

class WebContentRoleTypeView extends View {

  id() {
    return this.props.item.id || "new";
  }

  content() {
    return this.props.item.description;
  }

}

export default WebContentRoleTypeView;
