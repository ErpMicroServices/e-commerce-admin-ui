import {View} from "./EditableList";

class FunctionTypeView extends View {

  id() {
    return this.props.item.id || "new";
  }

  content() {
    return this.props.item.description;
  }

}

export default FunctionTypeView;
