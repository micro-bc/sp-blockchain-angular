import { Component, OnInit } from '@angular/core';

import { WalletService } from 'src/app/services/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private wallet: WalletService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.wallet.logout();
    this.router.navigateByUrl('/login');
  }

}
