import { Locator, Page } from "@playwright/test";

export class CompletePage{

    readonly page:Page;
    readonly completeBtn:Locator;
    

    constructor(page:Page){
        this.page = page;
        this.completeBtn = page.locator("#back-to-products");    
    }
    
    async clickComplete(){        
        await this.completeBtn.click();
    }

}