import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {PageHeader} from "bootstrap-react-components";
import {load, add} from "../../actions";
import {WebPreferenceTypeList} from "../components/WebPreferenceTypes";

class WebPreferenceTypeListPage extends React.Component {
    componentWillMount() {
        this.props.load();
    }

    constructor(props) {
        super(props);
    }

    onListChange(list) {
        this.setState({list});
    }

    render() {
        let {list} = this.props;
        return (
            <div id="WebPreferenceTypeListPage">
                <PageHeader id="WebPreferenceTypeListPage">
                    <h1>Web Preference Types</h1>
                </PageHeader>
                <WebPreferenceTypeList
                  add={this.props.add.bind(this)}
                  allowEditing={true}
                  list={list}

                  onListChange={this.onListChange.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {list: state.web_preference_types.list};
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => dispatch(load()),
        add: (newWebPreferenceType) => dispatch(add(newWebPreferenceType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebPreferenceTypeListPage);
