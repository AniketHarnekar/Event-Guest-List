import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { DataService } from '../data-service.service';




@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:User[]=[];
  errorMessage: string = '';

  constructor(private userService:UserService, public dataService: DataService){ }

   ngOnInit() {
    this.getUsers();
    console.log(this.users);

    this.dataService.addedOrUpdatedUser$.subscribe((newUser:User | null) => {
      console.log('Updating user list',newUser);
      if (newUser) {
        var index = this.users.findIndex(exstingUser => exstingUser.id === newUser.id);

        if(index !== -1) {
          this.userService.updateUser(newUser).subscribe({
            next:(updatedUser:User)=>{
              {
                this.users[index] = updatedUser;
              }
            },
            error: (error:any) => {
              console.error('Failed to update user');
              this.errorMessage = 'Failed to update user';
            }
          });
        } 
        else
        {
          this.userService.addUser(newUser).subscribe({
            next: (addedUser:User) =>  {
              {
                let lastelement = this.users[this.users.length-1];
                addedUser.id = lastelement.id + 1;
                this.users.push(addedUser);
              }
            },
            error: (error:any) => {
              console.error('Failed to add user');
              this.errorMessage = 'Failed to add user';
            }
          });
        }
      }
    });
   }


  getUsers() {
    this.userService.getUser().subscribe({
      next: (users: any) => {
        this.users = users.map((user: any) => ({
          ...user,
          firstname: user.name.split(' ')[0],
          lastname: user.name.split(' ')[1]
        }));
      },
      error: (error:any) => {
        console.error('Failed to retreive Users');
        this.errorMessage = 'Failed to retreive Users';
      }
    });
  }


  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: ()=> {
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (error:any)=> {
        console.error('Failed to delete user');
        this.errorMessage = 'Failed to delete user';
      },
    })
  }

  selectUser(user: User): void {
    this.dataService.updateSelectedUsers(user);
  }

}




