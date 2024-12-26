import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { LoginComponent } from './components/login/login.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartComponent } from './components/cart/cart.component';


export const routes: Routes = [
    {path:'',component:ToolBarComponent} ,
    {path:'login',component:LoginComponent}
];
