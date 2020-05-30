import { Component, OnInit } from '@angular/core';

import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private wallet: WalletService) { }

  ngOnInit(): void {
  }

  getUsername(): string {
    return this.wallet.username;
  }

  getAddress(): string {
    return this.wallet.getPublic();
  }

}
