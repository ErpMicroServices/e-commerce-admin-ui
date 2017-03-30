import React from "react";
import {Link} from "react-router";

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            collapsed: true,
            username: null
        };
    }

    toggleCollapse() {
        let collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }

    toggleTypesOpen() {
        let typesOpen = !this.state.typesOpen;
        this.setState({typesOpen});
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    openWebContentRoleTypes(e) {
      e.preventDefault();
      this.props.openWebContentRoleTypes();
    }

openWebContentStatusTypes(e) {
  e.preventDefault();
  this.props.openWebContentStatusTypes();
}

    openWebContentTypes(e) {
      e.preventDefault();
      this.props.openWebContentTypes();
    }

    openWebPreferenceTypes(e) {
        e.preventDefault();
        this.props.openWebPreferenceTypes();
    }

    openFunctionTypes(e) {
        e.preventDefault();
        this.props.openFunctionTypes();
    }

    render() {
        let {collapsed, typesOpen} = this.state;
        const navClass = collapsed
            ? "collapse"
            : "";
        const typesMenuOpenClass = typesOpen
            ? "open"
            : "";
        const {auth, location, user} = this.props;
        let UserComponent = auth.isAuthenticated
            ? (
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="#" onClick={this.logout.bind(this)}>
                            <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                        </a>
                    </li>
                </ul>
            )
            : <ul class="nav navbar-nav navbar-right"></ul>;
        return (
            <nav class="navbar navbar-inverse navbar-fixed-top">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar" onClick={this.toggleCollapse.bind(this)}>
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">{this.props.title}</a>
                    </div>
                    <div id="navbar" class={"navbar-collapse " + navClass}>
                        <ul class="nav navbar-nav">
                            <li class={"dropdown " + typesMenuOpenClass} onClick={this.toggleTypesOpen.bind(this)}>
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Types
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>

                                        <a href="#" onClick={this.openFunctionTypes.bind(this)}>Function Types</a>
                                        <a href="#" onClick={this.openWebContentStatusTypes.bind(this)}>Web Content Status Types</a>
                                        <a href="#" onClick={this.openWebContentTypes.bind(this)}>Web Content Types</a>
                                        <a href="#" onClick={this.openWebContentRoleTypes.bind(this)}>Web Content Role Types</a>
                                        <a href="#" onClick={this.openWebPreferenceTypes.bind(this)}>Web Preference Types</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        {UserComponent}
                    </div>
                </div>
            </nav>
        );
    }
}
export default Header;
