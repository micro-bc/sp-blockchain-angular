import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  error: string = '';
  user: User;

  constructor(
    private userService: UserService,
    private wallet: WalletService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit() {

    this.error = '';

    this.userService.login(this.user).subscribe(res => {

      this.wallet.login(res.username, res.privateKey);
      this.router.navigateByUrl('/');

    }, err => {
      this.error = err['error']['error'] || err['name'];
    });

  }

}
