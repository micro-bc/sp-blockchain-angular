import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  error: string = '';

  constructor(
    private wallet: WalletService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(privateKey) {

    if (this.wallet.login(privateKey)) {
      this.router.navigateByUrl('/');
    }
    else {
      this.error = 'Could not login!';
    }

  }

}
