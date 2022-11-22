import { Component, OnInit, ViewChild } from '@angular/core';
//
import {
  PaymentTransactionComponent,
} from '@app/modules/payment/components';

@Component({
  selector: 'app-manage-revenus',
  templateUrl: './manage-revenus.component.html',
  styleUrls: ['./manage-revenus.component.scss']
})
export class ManageRevenusComponent implements OnInit {
  @ViewChild('paymentTransactionTable') paymentTransactionComponent: PaymentTransactionComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
