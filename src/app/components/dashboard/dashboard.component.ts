import { Component, OnInit } from '@angular/core';

import { WalletService } from 'src/app/services/wallet.service';
import { NodeService } from 'src/app/services/node.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public wallet: WalletService,
    public nodeService: NodeService
  ) { }

  ngOnInit(): void {
  }

  getUsername(): string {
    return this.wallet.username;
  }

  getAddress(): string {
    return this.wallet.getPublic();
  }

}
