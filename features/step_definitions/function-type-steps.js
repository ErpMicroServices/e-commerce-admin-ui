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

    Given('I have provided a function type called {stringInDoubleQuotes}', function(function_type, callback) {
        this.function_type = function_type;
        callback();
    });

    Given('a function type exists called {stringInDoubleQuotes}', function(function_type) {
        return this.db.one("insert into function_type (description) values ($1) returning id", [function_type])
            .then((data) => this.exisiting_function_type_id = data.id);
    });

    When('I save the function type', function() {
        return this.functionTypePage.openPage()
            .then(() => this.functionTypePage.addButton)
            .then(addButton => addButton.click())
            .then(() => this.functionTypePage.functionTypeDescriptionText)
            .then(textBox => textBox.sendKeys(this.function_type))
            .then(() => this.functionTypePage.saveButton)
            .then(button => button.click())
            .then(() => sleep(500));
    });

    When('I retrieve a list of functions', function() {
        return this.functionTypePage.openPage()
            .then(() => this.functionTypePage.functionTypeList);
    });

    When('I update the function to {stringInDoubleQuotes},', function(changedWebPreference) {
        return this.functionTypePage.openPage()
            .then(() => this.functionTypePage.editButton(this.exisiting_function_type_id))
            .then(button => button.click())
            .then(() => this.functionTypePage.functionTypeDescriptionTextFor(this.exisiting_function_type_id))
            .then((textBox) => textBox.clear()
                .then(emptyTextBox => textBox.sendKeys(changedWebPreference)))
            .then(() => this.functionTypePage.saveButton)
            .then(button => button.click());
    });

    When('I delete a function type', function() {
        return this.functionTypePage.openPage()
            .then(() => this.functionTypePage.deleteButton(this.exisiting_function_type_id))
            .then(button => button.click())
    });

    Then('the function type is in the database', function() {
        return this.db.one("select id, description from function_type where description = $1", [this.function_type])
            .then((data) => {
                expect(data.description).to.be.equal(this.function_type);
            });
    });

    Then('I get an error message about duplicate function types', function() {
        return this.driver.wait(until.elementIsVisible(this.functionTypePage.alert))
            .then(() => this.functionTypePage.alertText)
            .then(text => expect('GraphQL error: duplicate key value violates unique constraint "function_type_description_key"').to.be.equal(text));
    });

    Then('the function list contains {stringInDoubleQuotes}', function(preferenceType) {
        let textList = [];
        this.functionTypePage.functionTypeList
            .then(elementList => elementList.map(element => element.getText()
                .then(text => textList.push(text.trim()))))
            .then(() => expect(textList).to.include(preferenceType));
    });

    Then('the function type called {stringInDoubleQuotes} does not exist', function(function_type) {
        let textList = [];
        this.functionTypePage.functionTypeList
            .then(elementList => elementList.map(element => element.getText()
                .then(text => textList.push(text.trim()))))
            .then(() => expect(textList).to.not.include(function_type));
    });

    Then('the function value in the database is {stringInDoubleQuotes}', function(function_type_value) {
        return sleep(1000).then(() => this.db.one("select id, description from function_type where description = $1", [function_type_value]))
            .then((data) => {
                expect(data.description).to.be.equal(function_type_value);
            });
    });
});
