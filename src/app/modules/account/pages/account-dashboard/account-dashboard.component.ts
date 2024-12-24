import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss'],
})
export class AccountDashboardComponent {
  constructor(private _UserService: UserService) {
    this.currentUser = this._UserService.userName;
  }

  currentUser: string = '';

  ngOnInit(): void {}
}
