import { UserWithdrawalComponent } from './Components/user-withdrawal/user-withdrawal.component';
import { UserDepositComponent } from './Components/user-deposit/user-deposit.component';
import { AdminNetbankAccessComponent } from './Components/admin-netbank-access/admin-netbank-access.component';
import { UserAccountCreationComponent } from './Components/user-account-creation/user-account-creation.component';
import { AdminThreatComponent } from './Components/admin-threat/admin-threat.component';
import { AdminTransactComponent } from './Components/admin-transact/admin-transact.component';
import { AdminChequeComponent } from './Components/admin-cheque/admin-cheque.component';
import { AdminAccountManageComponent } from './Components/admin-account-manage/admin-account-manage.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { UserTransfersComponent } from './Components/user-transfers/user-transfers.component';
import { UserTransactionsComponent } from './Components/user-transactions/user-transactions.component';
import { UserChequeBookComponent } from './Components/user-cheque-book/user-cheque-book.component';
import { UserAccountsComponent } from './Components/user-accounts/user-accounts.component';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { UserRegistrationComponent } from './Components/user-registration/user-registration.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';

const routes: Routes = [
  {path:'', component:UserLoginComponent},
  {path:'registration', component:UserRegistrationComponent},
  {path:'user-account-create', component:UserAccountCreationComponent},
  {path:'user-dashboard', component:UserDashboardComponent},
  {path:'user-accounts', component:UserAccountsComponent},
  {path:'user-profile', component:UserProfileComponent},
  {path:'user-cheque', component:UserChequeBookComponent},
  {path:'user-passbook', component:UserTransactionsComponent},
  {path:'user-transfer',component:UserTransfersComponent},
  {path:'user-deposit',component:UserDepositComponent},
  {path:'user-withdraw',component:UserWithdrawalComponent},
  {path:'admin',component:AdminLoginComponent},
  {path:'admin-dashboard',component:AdminDashboardComponent},
  {path:'admin-manage-accounts',component:AdminAccountManageComponent},
  {path:'admin-cheque',component:AdminChequeComponent},
  {path:'admin-transact', component:AdminTransactComponent},
  {path:'admin-threat', component:AdminThreatComponent},
  {path:'admin-netbank-access', component:AdminNetbankAccessComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
