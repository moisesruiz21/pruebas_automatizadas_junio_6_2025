import { Locator, Page } from "@playwright/test";

export class InventoryPage{

    readonly page:Page;
    readonly addProductButton:Locator;
    readonly checkcarList:Locator;
    

    constructor(page:Page){
        this.page = page;
        this.addProductButton = page.locator("#add-to-cart-sauce-labs-backpack");
        this.checkcarList = page.locator(".shopping_cart_link");       
    }
    
    async addProductCar(){        
        await this.addProductButton.click();
    }

    async checkCar(){
        await this.checkcarList.click();
    }

}