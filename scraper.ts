import puppeteer from "puppeteer";

interface BillingDetails {
    firstName: string,
    lastName: string,
    addressLine1: string,
    addressLine2?: string,
    town: string,
    postcode: string,
}

interface CardDetails {
    cardholderName: string,
    cardNumber: string,
    expiryDate: string,
    securityCode: string,
}

interface Config {
    initialUrl: string,
    startTime: string,
}

enum Activity {
    HIGHBURY_FIELDS_TENNIS,
    LONDON_FIELDS_SWIMMING,
}

const getConfig = (activity: Activity): Config | undefined => {
    switch (activity) {
        case Activity.HIGHBURY_FIELDS_TENNIS:
            return {
                initialUrl: "https://bookings.better.org.uk/location/islington-tennis-centre/highbury-tennis/2023-07-10/by-time",
                startTime: "09:00",
            }
        case Activity.LONDON_FIELDS_SWIMMING:
            return {
                initialUrl: "https://bookings.better.org.uk/location/london-fields-lido/swim-for-fitness/2023-07-10/by-time",
                startTime: "09:00",
            }
        default:
            return;
    }
}

const HEADLESS = false;

const run = async (activity: Activity) => {
    const config = getConfig(activity);

    if (config == undefined) {
        // handle error
    } else {
        const browser = await puppeteer.launch({headless: HEADLESS});
        const page = await browser.newPage();
    
        await page.goto(config.initialUrl);
    
        /* 
        Navigate Login
        */
    
        // click log-in button
        await page.locator("#root > div.NavComponent__Wrapper-sc-1xjd6e5-0.LbEso > div > div > ul > li:nth-child(3) > button").click();
        
        // Enter email address
        await page.locator("body > div:nth-child(5) > div.Modal__ModalWrapper-sc-2yutoc-0.jWYvtC.LoginContainer__StyledModal-sc-uwhb26-0.kUcjOZ > form > div:nth-child(1) > div > input").fill("finnharman@gmail.com");
        
        // Enter password
        await page.locator("body > div:nth-child(5) > div.Modal__ModalWrapper-sc-2yutoc-0.jWYvtC.LoginContainer__StyledModal-sc-uwhb26-0.kUcjOZ > form > div:nth-child(2) > div > div > input").fill("8dK?fvQ9&S2.dDd");
        // Click log-in button
        await page.locator("body > div:nth-child(5) > div.Modal__ModalWrapper-sc-2yutoc-0.jWYvtC.LoginContainer__StyledModal-sc-uwhb26-0.kUcjOZ > form > div.SharedLoginComponent__ButtonWrap-sc-hdtxi2-4 > button > span").click();
    
        await page.waitForNetworkIdle();
    
        /* 
        Book an activity
        */
    
        // Find slot starting at startTime
        const startTimeDiv = await page.waitForXPath(`//div[starts-with(text(), "${config.startTime}")]`)
        if (startTimeDiv) {
            const startTimeDivParent = (await startTimeDiv.$x('../..'))[0];

            // Click "Book" button
            const bookButton = await startTimeDivParent.waitForSelector("button");
            await bookButton?.click();

            // Click "Book now" button
            await page.locator("body > div:nth-child(5) > div.Modal__ModalWrapper-sc-2yutoc-0.jWYvtC > div.Modal__ModalActions-sc-2yutoc-2.ConfirmComponent__ModalActionsWrapper-sc-2hrz7g-3.gaezdd.fRGPfV > button:nth-child(1)").click();

            await page.waitForNetworkIdle();
        } else {
            // handle error
        }
    }
}

run(Activity.LONDON_FIELDS_SWIMMING);