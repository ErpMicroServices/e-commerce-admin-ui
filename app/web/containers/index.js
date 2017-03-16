import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";

class Index extends React.Component {


	render() {
		return (
			<h1>Hello world</h1>
		);
	}

}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
