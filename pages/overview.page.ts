import { Locator, Page } from "@playwright/test";

export class OverviewPage{

    readonly page:Page;
    readonly finishButton:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.finishButton = page.locator("#finish");        
    }
    
    async finishClick(){
        await this.finishButton.click();
    }

}