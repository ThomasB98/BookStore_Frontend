import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../service/wishlistService/wishlist.service';
import { tick } from '@angular/core/testing';
import { WishListComponent } from '../wish-list/wish-list.component';
import { AuthService } from '../../service/authService/auth.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-wish-list',
  imports: [WishListComponent],
  templateUrl: './display-wish-list.component.html',
  styleUrl: './display-wish-list.component.css'
})
export class DisplayWishListComponent implements OnInit{

  wishlists:any[]=[];
  length:number=0;
  durationInSeconds=10;

  constructor(private _wishlistService:WishlistService,private _authService:AuthService,private _router:Router, private _snackBar:MatSnackBar){
  }

  ngOnInit(): void {
    if(!this._authService.isUserloggedIn()){
      this._router.navigate(['login']);
      return;
    }
    
    this.getWishList();

  }

  

  getWishList(){
    try{
      this._wishlistService.getWishList().subscribe(
        (res:any)=>{
          if(res.success){
            console.log("get wishlist result",res);
            
            console.log("printing wishlist");
            this.wishlists=res.data.books.$values;
            this.length=this.wishlists.length;
            
            console.log("get wishList :",this.wishlists);
            
          }
          else{
            console.log("DisplayWishListComponent Api failed",res);
          }
        }
      );
    }catch(error){
      console.log("DisplayWishListComponent ERROR",error);
      
    }
  }

  removeItem(item:any){
    try{
      this._wishlistService.removeBook(item.id).subscribe(
        (res:any)=>{
          if(res.success){
            this.getWishList();
            this.openSnackBar(res.message,"close");
          }
          else{
            console.log(res);
            this.openSnackBar(res.message,"close");
          }
        }
      );
    }catch(error){
      console.log(error);
      this.openSnackBar("error occure","close");
    }
  }

  openSnackBar(message: string, action: string) {
      const config: MatSnackBarConfig = {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar']
      };
  
      this._snackBar.open(message, action, config);
    }
  
}
