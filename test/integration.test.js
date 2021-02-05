const { describe, it, after, before } = require('mocha');
const Page = require('./lib/page');

const chai = require('chai');
const expect = chai.expect;

(async function test() {
    try {
        describe ('The Wall - Integration Testing', async function() {
            // let page;
            

            // beforeEach(async() => {
            //     page = await new Page();
            // });

            // afterEach(async() => {
            //     await page.quit();
            // });

            it('User is able to login successfully', async() => {
                let page = await new Page();
                //---------Perform---------//
                await page.testSuccessLogin();
                //---------Expect---------//
                const result = await page.findById("page_name");
                const result_text = await page.getText(result);
                expect(result_text).to.equal("CodingDojo Wall");
                await page.quit();
            });

            it('User is able to register successfully', async() => {
                let page = await new Page();
                //---------Perform---------//
                await page.testSuccessRegister();
                //---------Expect---------//
                const result = await page.findById("page_name");
                const result_text = await page.getText(result);
                expect(result_text).to.equal("CodingDojo Wall");
                await page.quit();
            });

            it('User is successfully able to log off', async() => {
                let page = await new Page();
                //---------Perform---------//
                await page.testSuccessLogin();
                await page.testSuccessLogoff();
                //---------Expect---------//
                const result = await page.findById("page_name");
                const result_text = await page.getText(result);
                expect(result_text).to.equal("Login");
                await page.quit();
            });

            it('User can successfully post a message after logging in', async() => {
                let page = await new Page();
                //---------Perform---------//
                await page.testSuccessLogin();
                let message = await page.testPostMessage();
                //---------Expect---------//
                const result = await page.findByCss("h3~p:last-of-type");
                const result_text = await page.getText(result);
                expect(result_text).to.equal(message);
                await page.quit();
            });

            it('User is NOT able to post a message if they are not logged in', async() => {
                let page = await new Page();
                //---------Perform---------//
                await page.testPostMessage_whenUserLogOff();
                //---------Expect---------//
                const result = await page.findByCss("pre");
                const result_text = await page.getText(result);
                expect(result_text).to.equal("Cannot GET /wall/message");
                await page.quit();
            });
            
        });
    } catch(ex) {
        console.log (new Error(ex.message));
    }
})();