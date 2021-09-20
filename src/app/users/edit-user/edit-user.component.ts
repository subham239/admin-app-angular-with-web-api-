import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  dataLoaded:boolean=false;
  userId:any;
  userDetails:any;
  editUserForm:FormGroup=new FormGroup({})
  constructor(private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private formBuilder:FormBuilder,
    private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.userId=data.id
    })
    if(this.userId!== ''){
      this.userService.viewuser(this.userId)
      .toPromise()
      .then(data=>{
        this.userDetails=data;
        //Object.assign(this.userDetails,data);
        
        //Build the edit form here
        this.editUserForm=this.formBuilder.group({
          'username':new FormControl(this.userDetails.name),
          'email':new FormControl(this.userDetails.email)
        })
        this.dataLoaded=true
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }

  updateUser(){
   this.userService.updateUser(this.userId,this.editUserForm.value).subscribe(data=>{
     this._snackBar.open("user updated successfully");
   },err=>{
     this._snackBar.open("unable to upadte user")
   })
  }
}
