import { Component, OnInit } from '@angular/core';

import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  error: string = '';
  privateKey: string;

  constructor(private wallet: WalletService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.privateKey = this.wallet.register();
  }

}
