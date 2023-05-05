import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User | null> = of(null);

  constructor(public accountService: AccountService, private router: Router,
    private toastr:ToastrService,public translate: TranslateService
    ) {
      translate.addLangs(['es', 'en']);
      translate.setDefaultLang('es');
    }

  ngOnInit(): void {

  }

  login(){
    this.accountService.login(this.model).subscribe({
        next: _ => this.router.navigateByUrl('/members'),
        error: error => this.toastr.error(error.error)
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
