const BasePage = require('./basePage');
const faker = require('faker');

class Page extends BasePage {
    constructor(){
        super();
    }

    async testSuccessLogin(){
        //1. Open in browser
        await this.visit('http://localhost:1433');
        //2. Type email               
        let input_email = await this.findByName("email");
        await this.write(input_email, "kmeigcasan@gmail.com");
        //3. Type password
        let input_password = await this.findByName("password");
        await this.write(input_password, "1234567890");
        //4. Click submit
        let button_submit = await this.findByName("submit");
        await button_submit.click();
        await this.wait();
    }

    async testInvalidLogin(){
        //1. Open in browser
        await this.visit('http://localhost:1433');
        //2. Type email              
        let input_email = await this.findByName("email");
        await this.write(input_email, "kmeigcasan@gmail.com");
        //3. Type password
        let input_password = await this.findByName("password");
        await this.write(input_password, "wrong pass");
        //4. Click submit
        let button_submit = await this.findByName("submit");
        await button_submit.click();
        await this.wait();
    }

    async testSuccessRegister(){
        //1. Open in browser
        await this.visit('http://localhost:1433/register');
                
        //2. Type first name               
        let input_fname = await this.findByName("first_name");
        let fname = faker.name.firstName(0);
        await this.write(input_fname, fname);
        
        //3. Type last name               
        let input_lname = await this.findByName("last_name");
        let lname = faker.name.lastName(0);
        await this.write(input_lname, lname);
        
        //4. Type email               
        let input_email = await this.findByName("email");
        await this.write(input_email, faker.internet.exampleEmail(fname, lname));
       
        //5. Type password
        let input_password = await this.findByName("password");
        let pass = "1234567890";
        await this.write(input_password, pass);
        
        //6. Type confirm password
        let input_confirm_password = await this.findByName("confirm_password");
        await this.write(input_confirm_password, pass);
        
        //7. Click submit
        let button_submit = await this.findByName("submit");
        await button_submit.click();
        await this.wait();
    }

    async testSuccessLogoff(){
        let link_logoff = await this.findById("logoff");
        await link_logoff.click();
        await this.wait();
    }

    async testPostMessage(){
        //1. Type a message
        let input_message = await this.findByName("message_input");
        let message = faker.lorem.lines(1);
        await this.write(input_message, message);
        //2. Click submit
        let button_submit = await this.findById("post_message");
        await button_submit.click();
        await this.wait();
        //3. Return exact message
        return message;
    }

    async testPostMessage_whenUserLogOff(){
        await this.visit('http://localhost:1433/wall/message');
    }
}



module.exports = Page;