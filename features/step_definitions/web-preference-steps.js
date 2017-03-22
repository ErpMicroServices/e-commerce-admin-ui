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

    Given('I have provided a web preference type called {stringInDoubleQuotes}', function(web_preference_type, callback) {
        this.web_preference_type = web_preference_type;
        callback();
    });

    Given('a web preference type exists called {stringInDoubleQuotes}', function(web_preference_type) {
        return this.db.one("insert into web_preference_type (description) values ($1) returning id", [web_preference_type])
            .then((data) => this.exisiting_web_preference_id = data.id);
    });

    When('I save the web preference type', function() {
        return this.webPreferenceTypePage.openPage()
            .then(() => this.webPreferenceTypePage.addButton)
            .then(addButton => addButton.click())
            .then(() => this.webPreferenceTypePage.webPreferenceTypeDescriptionText)
            .then(textBox => textBox.sendKeys(this.web_preference_type))
            .then(() => this.webPreferenceTypePage.saveButton)
            .then(button => button.click());
    });

    When('I retrieve a list of web preferences', function() {
        return this.webPreferenceTypePage.openPage()
            .then(() => this.webPreferenceTypePage.webPreferenceTypeList);
    });

    When('I update the web preference to {stringInDoubleQuotes},', function(changedWebPreference) {
        return this.webPreferenceTypePage.openPage()
            .then(() => this.webPreferenceTypePage.editButton(this.exisiting_web_preference_id))
            .then(button => button.click())
            .then(() => this.webPreferenceTypePage.webPreferenceTypeDescriptionTextFor(this.exisiting_web_preference_id))
            .then((textBox) => textBox.clear()
                .then(emptyTextBox => textBox.sendKeys(changedWebPreference)))
            .then(() => this.webPreferenceTypePage.saveButton)
            .then(button => button.click())
            ;
    });

    When('I delete a web preference type', function(callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    Then('the web preference type is in the database', function() {
        return this.db.one("select id, description from web_preference_type where description = $1", [this.web_preference_type])
            .then((data) => {
                expect(data.description).to.be.equal(this.web_preference_type);
            });
    });

    Then('I get an error message', function() {
        return this.driver.wait(until.elementIsVisible(this.webPreferenceTypePage.alert))
            .then(() => this.webPreferenceTypePage.alertText)
            .then(text => expect(text).to.be.equal('GraphQL error: duplicate key value violates unique constraint "web_preference_type_description_key"'));
    });

    Then('the web preference list contains {stringInDoubleQuotes}', function(preferenceType) {
        let textList = [];
        this.webPreferenceTypePage.webPreferenceTypeList
            .then(elementList => elementList.map(element => element.getText()
                .then(text => textList.push(text.trim()))))
            .then(() => expect(textList).to.include(preferenceType));
    });

    Then('the web preference type called {stringInDoubleQuotes} does not exist', function(arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    Then('the web preference value in the database is {stringInDoubleQuotes}', function(web_preference_value) {
        return sleep(1000).then(() => this.db.one("select id, description from web_preference_type where description = $1", [web_preference_value]))
            .then((data) => {
                expect(data.description).to.be.equal(web_preference_value);
            });
    });
});
