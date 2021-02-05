const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class BasePage {
    constructor(){
        let o = new chrome.Options();
        o.addArguments('disable-infobars');
        o.addArguments('headless'); 
        o.addArguments('no-sandbox');
        o.addArguments('disable-dev-shm-usage');
        o.setUserPreferences({ credential_enable_service: false });

        this.driver = new Builder().setChromeOptions(o).forBrowser('chrome').build();
    }

    // visit a webpage
    async visit(url){
        return await this.driver.get(url);
    };

    // quit current session
    async quit(){
        return await this.driver.quit();
    };

    // wait and find a specific element with it's id
    async findById(id){
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
        return await this.driver.findElement(By.id(id));
    };

    // wait and find a specific element with it's name
    async findByName(name){
        return await this.driver.findElement(By.name(name));
    };

    // wait and find a specific element with it's name
    async findByCss(selector){
        await this.driver.wait(until.elementLocated(By.css(selector)), 15000, 'Looking for element');
        return await this.driver.findElement(By.css(selector));
    };

    // get the text after 5000ms loading of html
    async getText(element){
        return await this.driver.wait(async function(){
            return await element.getText();
        }, 5000);
    }

    // pause for a while
    async wait(){
        await this.driver.sleep(3000);
    }

    // fill input web elements
    async write(element, txt){
        return await element.sendKeys(txt);
    };
};

module.exports = BasePage;