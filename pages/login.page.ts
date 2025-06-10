import { Locator, Page } from "@playwright/test";
import { UserCredentials } from "../models/login.model";

export class LoginPage{
    readonly page:Page;
    readonly userName:Locator;
    readonly password:Locator;
    readonly buttonLogin:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.userName = page.locator("#user-name");
        this.password = page.locator("#password");
        this.buttonLogin = page.locator("#login-button");
    }
    async goTo(url:string){
        await this.page.goto(url);
    }
    async fillValue(credentials:UserCredentials){
        await this.userName.fill(credentials.userName);
        await this.password.fill(credentials.password);
    }

    async submitLogin(){
        await this.buttonLogin.click();
    }
}