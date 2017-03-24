import webdriver from "selenium-webdriver";
const By = webdriver.By;

class WebPreferenceTypeListPage {

    get addButton() {
        return this.driver.findElement(By.id('addWebPreferenceTypeListButton'))
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
        return this.driver.navigate().to("http://localhost/e-commerce-admin#/web_preference_types");
    }

    get saveWebPreferenceTypeDescriptionButton() {
        return this.driver.findElement(By.id("saveWebPreferenceTypeDescriptionButton"));
    }

    get webPreferenceTypeDescriptionText() {
        return this.driver.findElement(By.id('Description'));
    }

    webPreferenceTypeDescriptionTextFor(id) {
        return this.driver.findElement(By.id(`${id}Description`));
    }
    get pageHeader() {
        return this.driver.findElement(By.id('WebPreferenceTypeListPagePageHeader'));
    }

    get saveButton() {
        return this.driver.findElement(By.css('.save-button'));
    }

    get webPreferenceTypeList() {
        return this.driver.findElement(By.id('WebPreferenceTypeListList'));
    }

    get webPreferenceTypeListElements() {
      return this.webPreferenceTypeList.then( we => we.findElements(By.tagName("li")));
    }
}

export default WebPreferenceTypeListPage;
