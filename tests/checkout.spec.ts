import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { UserCredentials } from '../models/login.model';
import { InventoryPage } from '../pages/inventory.page';
import jsonData from '../data-provider/login.data.json';
import { CartPage } from '../pages/cart.page';
import { User } from '../models/user.model';
import { UserInfo } from '../pages/userinfo.page';
import { OverviewPage } from '../pages/overview.page';
import { CompletePage } from '../pages/complete.page';

let loginpage : LoginPage;
let credentials : UserCredentials;
let inventorypage : InventoryPage;
let cart:CartPage;
let userinfo:User;
let usrinfo:UserInfo;
let overview:OverviewPage;
let complete:CompletePage;

test.beforeEach(async({page})=>{   

    loginpage = new LoginPage(page);
    inventorypage = new InventoryPage(page);
    cart = new CartPage(page);
    usrinfo = new UserInfo(page);
    overview = new OverviewPage(page);
    complete = new CompletePage(page);

    await loginpage.goTo("https://www.saucedemo.com");
    credentials = {
        userName : jsonData.username.valid ,
        password: `${process.env.PASSWORD}`
    };
    await loginpage.fillValue(credentials);
    await loginpage.submitLogin();          

});


test.describe("checkout test", () => {
    
    test("Product list added to car", {tag: '@checkout'}, async ({ page }) => {

        await inventorypage.addProductCar();
        await inventorypage.checkCar();
        await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();

        /*await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");  */

    });

    test("Product list added to car and added user information", {tag: '@check-info'}, async ({ page }) => {

        userinfo = {
            firstName: jsonData.userInformation.userName,
            lastName: jsonData.userInformation.lastName,
            postalCode: jsonData.userInformation.postalCode
        }         
        await inventorypage.addProductCar();
        await inventorypage.checkCar();        
        await cart.clickCheckout();
        await usrinfo.fillInformation(userinfo);
        await usrinfo.submitCheckoutStepOne();
        
        const precios = page.locator('[data-test="inventory-item-price"]');
        const count = await precios.count();      
        let totalCalculado = 0;      
        for (let i = 0; i < count; i++) {
          const texto = await precios.nth(i).textContent(); // Ej: "$29.99"
          const valor = parseFloat(texto?.replace('$', '') || '0');
          totalCalculado += valor;
        }      
        console.log('Total calculado:', totalCalculado);      
        // Obtener el subtotal mostrado en el resumen
        const subtotalTexto = await page.locator('[data-test="subtotal-label"]').textContent(); // Ej: "Item total: $29.99"
        const subtotalMostrado = parseFloat(subtotalTexto?.replace(/[^\d.]/g, '') || '0');      
        console.log('Subtotal mostrado:', subtotalMostrado);      
        // Validar que ambos valores sean iguales
        expect(totalCalculado).toBeCloseTo(subtotalMostrado, 2); // 2 decimales de precisión
       // await expect(page.getByText("Checkout: Overview")).toBeVisible();
        

    });

    test("Product list Overview (checkout-step-two)", {tag: '@Overview'}, async ({ page }) => {

        userinfo = {
            firstName: jsonData.userInformation.userName,
            lastName: jsonData.userInformation.lastName,
            postalCode: jsonData.userInformation.postalCode
        }        
        await inventorypage.addProductCar();
        await inventorypage.checkCar();        
        await cart.clickCheckout();
        await usrinfo.fillInformation(userinfo);
        await usrinfo.submitCheckoutStepOne();
        await overview.finishClick();
        await expect(page.getByText("Thank you for your order!")).toBeVisible();        

    });  
    
    test("Product list Overview (complete)", {tag: '@complete'}, async ({ page }) => {

        userinfo = {
            firstName: jsonData.userInformation.userName,
            lastName: jsonData.userInformation.lastName,
            postalCode: jsonData.userInformation.postalCode
        }        
        await inventorypage.addProductCar();
        await inventorypage.checkCar();        
        await cart.clickCheckout();
        await usrinfo.fillInformation(userinfo);
        await usrinfo.submitCheckoutStepOne();
        await overview.finishClick();        
        await complete.clickComplete();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");        
    });        

});