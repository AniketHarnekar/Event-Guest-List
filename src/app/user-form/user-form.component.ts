import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import {User} from './../user'
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{
   userForm!:FormGroup;
   

  constructor(private formBuilder:FormBuilder, public dataService: DataService) {}

  ngOnInit() {
    this.userForm= this.formBuilder.group({
      id:[''],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      address:this.formBuilder.group({
        street:['',Validators.required],
        city:['',Validators.required],
        zipcode:['',Validators.required]
      }),
      
    })

    this.dataService.selectedUsers$.subscribe((user:User | null)=>{
      if(user){
      console.log('Patching form',user);
      this.userForm.patchValue(user);
      }
    })
  }


  onSubmit() {
    if (this.userForm.valid) 
    {
      const newUser: User = this.userForm.value;
      console.log("newUser.id",newUser.id)
      this.dataService.addOrUpdateUser(newUser);
      this.userForm.reset();
    }
  }

}
