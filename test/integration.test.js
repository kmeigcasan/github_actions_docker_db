const { describe, it, after, before } = require('mocha');
const Page = require('./lib/page');

const chai = require('chai');
const expect = chai.expect;

(async function test() {
    try {
        describe ('The Wall - Integration Testing', async function() {
            let page;
            this.timeout(50000);

            beforeEach(async() => {
                page = new Page();
            });

            afterEach(async() => {
                await page.quit();
            });

            it('User is able to login successfully', async() => {
                //---------Perform---------//
                await page.testSuccessLogin();
                //---------Expect---------//
                const result = await page.findById("page_name");
                const result_text = await page.getText(result);
                expect(result_text).to.equal("CodingDojo Wall");
            });

            it('User is able to register successfully', async() => {
                //---------Perform---------//
                await page.testSuccessRegister();
                //---------Expect---------//
                const result = await page.findById("page_name");
                const result_text = await page.getText(result);
                expect(result_text).to.equal("CodingDojo Wall");
            });

            it('User is successfully able to log off', async() => {
                //---------Perform---------//
                await page.testSuccessLogin();
                await page.testSuccessLogoff();
                //---------Expect---------//
                const result = await page.findById("page_name");
                const result_text = await page.getText(result);
                expect(result_text).to.equal("Login");
            });

            it('User can successfully post a message after logging in', async() => {
                //---------Perform---------//
                await page.testSuccessLogin();
                let message = await page.testPostMessage();
                //---------Expect---------//
                const result = await page.findByCss("h3~p:last-of-type");
                const result_text = await page.getText(result);
                expect(result_text).to.equal(message);
            });

            it('User is NOT able to post a message if they are not logged in', async() => {
                //---------Perform---------//
                await page.testPostMessage_whenUserLogOff();
                //---------Expect---------//
                const result = await page.findByCss("pre");
                const result_text = await page.getText(result);
                expect(result_text).to.equal("Cannot GET /wall/message");
            });
            
        });
    } catch(ex) {
        console.log (new Error(ex.message));
    }
})();