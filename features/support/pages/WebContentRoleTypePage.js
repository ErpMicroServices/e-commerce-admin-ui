import webdriver from "selenium-webdriver";
const By = webdriver.By;

class WebContentRoleTypeListPage {

    get addButton() {
        return this.driver.findElement(By.id('addWebContentRoleTypeListButton'))
    }

    get alert() {
        return this.driver.findElement(By.css('#layout > div.alert.alert-danger'));
    }

    get alertText() {
        return this.alert.getText();
    }

    constructor(driver) {
        this.driver = driver;
    }

    deleteButton(id) {
        return this.driver.findElement(By.id(`id${id}RemoveButton`));
    }

    editButton(id) {
        return this.driver.findElement(By.id(`id${id}EditButton`));
    }

    openPage() {
        return this.driver.navigate().to("http://localhost/e-commerce-admin#/web_content_role_types");
    }

    get saveWebContentRoleTypeDescriptionButton() {
        return this.driver.findElement(By.id("saveWebContentRoleTypeDescriptionButton"));
    }

    get webContentRoleTypeDescriptionText() {
        return this.driver.findElement(By.id('Description'));
    }

    webContentRoleDescriptionTypeTextFor(id) {
        return this.driver.findElement(By.id(`${id}Description`));
    }
    get pageHeader() {
        return this.driver.findElement(By.id('WebContentRoleTypeListPagePageHeader'));
    }

    get saveButton() {
        return this.driver.findElement(By.css('.save-button'));
    }

    get webContentRoleTypeList() {
        return this.driver.findElement(By.id('WebContentRoleTypeListList'));
    }

    get webContentRoleTypeListElements() {
        return this.webContentRoleTypeList.then(we => we.findElements(By.tagName("li")));
    }
}

export default WebContentRoleTypeListPage;
