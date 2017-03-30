// features/support/world.js
import webdriver from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import config from "./config";
import database from "./database";
import WebContentRoleTypePage from "./pages/WebContentRoleTypePage";
import WebContentStatusTypePage from "./pages/WebContentStatusTypePage";
import WebContentTypePage from "./pages/WebContentTypePage";
import WebPreferenceTypePage from "./pages/WebPreferenceTypeListPage";
import FunctionTypePage from "./pages/FunctionTypeListPage";

var {
    defineSupportCode
} = require('cucumber');

function CustomWorld() {

    this.config = config;

    this.db = database;

    this.driver = new webdriver.Builder()
        .forBrowser('chrome')
        // .setChromeOptions( /* ... */ )
        .build();

    this.webPreferenceTypePage = new WebPreferenceTypePage (this.driver);
    this.functionTypePage = new FunctionTypePage(this.driver);
    this.webContentStatusTypePage = new WebContentStatusTypePage(this.driver);
    this.webContentRoleTypePage = new WebContentRoleTypePage(this.driver);
    this.webContentTypePage = new WebContentTypePage(this.driver);

    this.by = webdriver.By;
    this.until = webdriver.until;

    this.user = {
        user_id: '',
        password: ''
    };

    this.web_preference_type = "";

    this.exisiting_web_preference_id = [];

    this.result = {
        error: null,
        data: null
    };
}

defineSupportCode(function({
    setWorldConstructor
}) {
    setWorldConstructor(CustomWorld)
});
