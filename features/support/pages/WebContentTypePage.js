import webdriver from "selenium-webdriver";
const By = webdriver.By;

class WebContentTypeListPage {

    get addButton() {
        return this.driver.findElement(By.id('addWebContentTypeListButton'))
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
        return this.driver.navigate().to("http://localhost/e-commerce-admin#/web_content_types");
    }

    get saveButton() {
        return this.driver.findElement(By.id("saveWebContentTypeDescriptionButton"));
    }

    get description() {
        return this.driver.findElement(By.id('Description'));
    }

    descriptionTextFor(id) {
        return this.driver.findElement(By.id(`${id}Description`));
    }
    get pageHeader() {
        return this.driver.findElement(By.id('WebContentTypeListPagePageHeader'));
    }

    get saveButton() {
        return this.driver.findElement(By.css('.save-button'));
    }

    get list() {
        return this.driver.findElement(By.id('WebContentTypeListList'));
    }

    get listElements() {
        return this.list.then(we => we.findElements(By.tagName("li")));
    }
}

export default WebContentTypeListPage;
