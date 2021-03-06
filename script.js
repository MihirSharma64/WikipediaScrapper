require('chromedriver');
const { fstat } = require('fs');
let wd = require('selenium-webdriver');
let browser = new wd.Builder().forBrowser('chrome').build();
let fs = require('fs');


async function main(){

    await browser.get(`https://www.wikipedia.org/`);
    await browser.wait(wd.until.elementLocated(wd.By.css('.central-featured-lang.lang1')));

    let englishLink = await browser.findElements(wd.By.css('.central-featured-lang.lang1'));
	await englishLink[0].click();

    
    /*---------------- All Portals ---------------------------------*/
    await browser.wait(wd.until.elementLocated(wd.By.css('li.portal-hright.portal-vbot')));

    let allPortalBtn = await browser.findElements(wd.By.css('li.portal-hright.portal-vbot'));
	await allPortalBtn[0].click();
    
    /*------------------------------------------------------------*/


    /*-------------- A-Z Index -----------------------------------*/
    await browser.wait(wd.until.elementLocated(wd.By.css('a[title="Wikipedia:Contents/A–Z index"]')));

    let azIndexBtn = await browser.findElements(wd.By.css('a[title="Wikipedia:Contents/A–Z index"]'));
	await azIndexBtn[0].click();

    /*------------------------------------------------------------*/


    /*------------------- Clicking M ----------------------------*/
    await browser.wait(wd.until.elementLocated(wd.By.css('a[title="Special:AllPages/M"]')));

    let mLetterBtn = await browser.findElements(wd.By.css('a[title="Special:AllPages/M"]'));
	await mLetterBtn[0].click();
    /*----------------------------------------------------------*/


    /*--------------------Clicking M article--------------------*/
    await browser.wait(wd.until.elementLocated(wd.By.css('.mw-allpages-chunk')));

    let mArtcile = await browser.findElements(wd.By.css('.mw-allpages-chunk li a'));
	await mArtcile[0].click();

    /*--------------------------------------------------------- */
    

    /*--------------- Content Part------------------------------*/

    await browser.wait(wd.until.elementLocated(wd.By.css('table.wikitable + p')));

    let paragraphs = await browser.findElements(wd.By.css('table.wikitable ~ p'));
	let historyParaText = await paragraphs[0].getAttribute('innerText') ;
    // console.log(historyParaText);

    let usesPara = await paragraphs[1].getAttribute('innerText');
    usesPara+='\n';
    usesPara += await paragraphs[2].getAttribute('innerText');
    // console.log(usesPara);

    let OtherUsesList = await browser.findElements(wd.By.css('table.wikitable ~ ul'));
    let listItems = await OtherUsesList[0].findElements(wd.By.css('li'));
    
 
    let OtherUsesText='';
    for(let i=0;i<listItems.length;i++){
        let text = await listItems[i].getAttribute('innerText');
        OtherUsesText = OtherUsesText + text + "\n";
    }
    // console.log(OtherUsesText);

    fs.writeFileSync('History.txt', (historyParaText));
    fs.writeFileSync('Uses.txt', (usesPara));
    fs.writeFileSync('OtherUses.txt', (OtherUsesText));

    /*------------------------------------------------------ */
    
    browser.close();

}

main();