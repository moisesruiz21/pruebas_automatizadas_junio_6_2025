import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { UserCredentials } from '../models/login.model';
import jsonData from '../data-provider/login.data.json'
let loginpage : LoginPage;
let credentials : UserCredentials;


test.beforeEach(async({page})=>{
    //await page.goto("https://www.saucedemo.com");
    loginpage = new LoginPage(page);
    await loginpage.goTo("https://www.saucedemo.com");
} );

test.describe("Login Tests", () => {
    test("should login with valid credentials", {tag: '@login'}, async ({ page }) => {
        // Fill in the login form
        /*await page.fill("#user-name", "standard_user");
        await page.fill("#password", "secret_sauce");    
        // Click the login button
        await page.click("#login-button");*/   
        // Expect to be redirected to the dashboard        
        credentials = {
            userName : jsonData.username.valid ,
            password: `${process.env.PASSWORD}`
        };
        await loginpage.fillValue(credentials);
        await loginpage.submitLogin();        
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });
    
    test("should show error for invalid credentials", {tag: '@lFail'}, async ({ page }) => { 
        /*// Fill in the login form with invalid credentials
        await page.fill("#user-name", "standard_user");
        await page.fill("#password", "secret_sauce2");    
        // Click the login button
        await page.click("#login-button");*/
        credentials = {
            userName : jsonData.username.invalid,//"standard_user",
            password: jsonData.username.invalid
        };        
        await loginpage.fillValue(credentials);
        await loginpage.submitLogin();
        // Expect an error message to be visible
        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    });

    
});