import webdriver from "selenium-webdriver";
const By = webdriver.By;

class FunctionTypeListPage {

    get addButton() {
        return this.driver.findElement(By.id('addFunctionTypeButton'))
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
        return this.driver.navigate().to("http://localhost/e-commerce-admin#/function_types");
    }

    get saveFunctionTypeDescriptionButton() {
        return this.driver.findElement(By.id("saveFunctionTypeDescriptionButton"));
    }

    get functionTypeDescriptionText() {
        return this.driver.findElement(By.id('Description'));
    }

    functionTypeDescriptionTextFor(id) {
        return this.driver.findElement(By.id(`${id}Description`));
    }
    get pageHeader() {
        return this.driver.findElement(By.id('FunctionTypeListPagePageHeader'));
    }

    get saveButton() {
        return this.driver.findElement(By.id('saveFunctionTypeDescriptionButton'));
    }

    get functionTypeList() {
        return this.driver.findElements(By.xpath('//*[@id="FunctionTypeListPage"]/div[2]/ol/li'));
    }

}

export default FunctionTypeListPage;
