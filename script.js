require('chromedriver');
let wd = require('selenium-webdriver');
let browser = new wd.Builder().forBrowser('chrome').build();


async function main(){
    await browser.get(`https://www.wikipedia.org/`);
    await browser.wait(wd.until.elementLocated(wd.By.css('.central-featured-lang.lang1')));

    let englishLink = await browser.findElements(wd.By.css('.central-featured-lang.lang1'));
	await englishLink[0].click();

    ///////////////// All Portals ///////////
    await browser.wait(wd.until.elementLocated(wd.By.css('li.portal-hright.portal-vbot')));

    let allPortalBtn = await browser.findElements(wd.By.css('li.portal-hright.portal-vbot'));
	await allPortalBtn[0].click();



}

main();