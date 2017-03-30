import {View} from "./EditableList";

class TypeView extends View {

  id() {
    return this.props.item.id || "new";
  }

  content() {
    return this.props.item.description;
  }

}

export default TypeView;
