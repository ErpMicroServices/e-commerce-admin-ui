import {View} from "./EditableList";

class WebPreferenceTypeView extends View {

  id() {
    return this.props.item.id || "new";
  }

  content() {
    return this.props.item.description;
  }

}

export default WebPreferenceTypeView;
