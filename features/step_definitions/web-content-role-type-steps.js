var {
    defineSupportCode
} = require('cucumber');

import webdriver from "selenium-webdriver";
const By = webdriver.By;
const until = webdriver.until;

defineSupportCode(function({
    Given,
    When,
    Then
}) {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    Given('I have provided a web content role type called {stringInDoubleQuotes}', function(web_content_role_type, callback) {
        this.web_content_role_type = web_content_role_type;
        callback();
    });

    Given('a web content role type exists called {stringInDoubleQuotes}', function(web_content_role_type) {
        return this.db.one("insert into web_content_role_type (description) values ($1) returning id", [web_content_role_type])
            .then((data) => this.exisiting_web_content_role_type_id = data.id);
    });

    When('I save the web content role type', function() {
        return this.webContentRoleTypePage.openPage()
            .then(() => this.webContentRoleTypePage.addButton)
            .then(addButton => addButton.click())
            .then(() => this.webContentRoleTypePage.webContentRoleTypeDescriptionText)
            .then(textBox => textBox.sendKeys(this.web_content_role_type))
            .then(() => this.webContentRoleTypePage.saveButton)
            .then(button => button.click())
            .then(() => sleep(500));
    });

    When('I retrieve a list of web content role types', function() {
        return this.webContentRoleTypePage.openPage()
            .then(() => this.webContentRoleTypePage.webContentRoleTypeList);
    });

    When('I update the web content role type to {stringInDoubleQuotes},', function(changedWebPreference) {
        return this.webContentRoleTypePage.openPage()
            .then(() => this.webContentRoleTypePage.editButton(this.exisiting_web_content_role_type_id))
            .then(button => button.click())
            .then(() => this.webContentRoleTypePage.webContentRoleDescriptionTypeTextFor(this.exisiting_web_content_role_type_id))
            .then((textBox) => textBox.clear()
                .then(emptyTextBox => textBox.sendKeys(changedWebPreference)))
            .then(() => this.webContentRoleTypePage.saveButton)
            .then(button => button.click());
    });

    When('I delete a web content role type', function() {
        return this.webContentRoleTypePage.openPage()
            .then(() => this.webContentRoleTypePage.deleteButton(this.exisiting_web_content_role_type_id))
            .then(button => button.click())
    });

    Then('the web content role type is in the database', function() {
        return this.db.one("select id, description from web_content_role_type where description = $1", [this.web_content_role_type])
            .then((data) => {
                expect(data.description).to.be.equal(this.web_content_role_type);
            });
    });

    Then('I get an error message about duplicate web content role types', function() {
        return this.driver.wait(until.elementIsVisible(this.webContentRoleType.alert))
            .then(() => this.webContentRoleTypePage.alertText)
            .then(text => expect('GraphQL error: duplicate key value violates unique constraint "web_content_role_type_description_key"').to.be.equal(text));
    });

    Then('the web content role type list contains {stringInDoubleQuotes}', function(preferenceType) {
        let textList = [];
        this.webContentRoleTypePage.webContentRoleTypeListElements
            .then(elementList => elementList.map(element => element.getText()
                .then(text => textList.push(text.trim()))))
            .then(() => expect(textList).to.include(preferenceType));
    });

    Then('the web content role type called {stringInDoubleQuotes} does not exist', function(web_content_role_type) {
        let textList = [];
        this.webContentRoleTypePage.webContentRoleTypeListElements
            .then(elementList => elementList.map(element => element.getText()
                .then(text => textList.push(text.trim()))))
            .then(() => expect(textList).to.not.include(web_content_role_type));
    });

    Then('the web content role type value in the database is {stringInDoubleQuotes}', function(web_content_role_type_value) {
        return sleep(1000).then(() => this.db.one("select id, description from web_content_role_type where description = $1", [web_content_role_type_value]))
            .then((data) => {
                expect(data.description).to.be.equal(web_content_role_type_value);
            });
    });
});
