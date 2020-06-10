import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { WalletService } from 'src/app/services/wallet.service';
import { NodeService } from 'src/app/services/node.service';
import { NewTransactionComponent } from '../new-transaction/new-transaction.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public wallet: WalletService,
    public nodeService: NodeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  getUsername(): string {
    return this.wallet.username;
  }

  getAddress(): string {
    return this.wallet.getPublic();
  }

  openTransactionModal(): void {
    this.modalService.open(NewTransactionComponent, { size: 'xl', centered: true });
  }

  formatAddress(address): string {
    if (!address) return 'Coinbase';

    if (address === this.wallet.getPublic()) return 'You';

    return '...' + address.substr(address.length - 7)
  }

}
