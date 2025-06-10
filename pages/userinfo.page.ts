import { Locator, Page } from "@playwright/test";
import { User } from "../models/user.model";

export class UserInfo {
    readonly page:Page;
    readonly userName:Locator;
    readonly lastName:Locator;
    readonly postalCode:Locator;
    readonly continue:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.userName = page.getByPlaceholder("First Name");//page.locator("#first-name");
        this.lastName = page.getByPlaceholder("Last Name");//page.locator("#last-name");
        this.postalCode = page.locator("#postal-code");
        this.continue = page.locator("#continue");
    }

    async fillInformation(userInfo:User){
        await this.userName.fill(userInfo.firstName);
        await this.lastName.fill(userInfo.lastName);
        await this.postalCode.fill(userInfo.postalCode);
    }

    async submitCheckoutStepOne(){
        await this.continue.click();
    }
}