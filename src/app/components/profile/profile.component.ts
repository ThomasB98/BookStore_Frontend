import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/authService/auth.service';
import { UserService } from '../../service/userService/user.service';
import { ShippingService } from '../../service/shippingService/shipping.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user:any;
  durationInSeconds=10;
  constructor(private _authService:AuthService,private _userService:UserService,
    private _shippingService:ShippingService,private _snackBar:MatSnackBar
  ){
  }
  ngOnInit(): void {
    this.getUserDetails();
  }
  isEditablePD: boolean = false; 
  isEditableAD: boolean =false;
  fullName: string = '';
  email: string = '';
  password: string = '';
  city: string = '';
  state: string = '';
  AddressLane1: string= '';
  AddressLane2: string= '';
  pincode: string= '';

  toggleEditPD(): void {
    this.isEditablePD = !this.isEditablePD;
  }

  toggleEditAD():void{
    this.isEditableAD=!this.isEditableAD;
  }
  

  getUserDetails(){
    try{
      this._userService.getUserDetails().subscribe(
        (res:any)=>{
          if(res.success){
            this.email=res.data.email;
            this.fullName=res.data.name;
            
          }
        }
      );
    }
    catch(error){
      console.log(error);
      
    }
  }

  AddAddress(){
    var redata={
      addressLine1:this.AddressLane1,
      addressLine2:this.AddressLane2,
      city:this.city,
      state:this.state,
      postalCode:this.pincode,
      userId:this._authService.getUserId(),
      orderId:0
    }

    try{
      this._shippingService.addNewAddress(redata).subscribe(
        (res:any)=>{
          if(res.success){
            console.log("Address added");
            this.openSnackBar(res.message,"close");
          }
          else{
            console.log("Address not added");
            this.openSnackBar(res.message,"close");
          }
        }
      );
    }catch(erro){
      console.log(erro);
      this.openSnackBar("Address not added","close");
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
