import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Transaction } from 'src/app/models/transaction';
import { NodeService } from 'src/app/services/node.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {

  transaction: Transaction = new Transaction();

  constructor(
    public modal: NgbActiveModal,
    private nodeService: NodeService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.transaction);
  }

}
