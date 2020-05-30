import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  error: string = '';
  user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit() {

    this.userService.register(this.user).subscribe(res => {

      this.router.navigateByUrl('/login');

    }, err => {
      this.error = err['error']['error'] || err['name'];
    });

  }

}
