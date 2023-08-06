import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  private readonly subs$: Subject<void> = new Subject();

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { 
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }  

  public ngOnInit(): void {
    console.log(this.form);
    this.route.queryParams.pipe(
      take(1),
      takeUntil(this.subs$)
    )
    .subscribe((params:Params)=>{
      if (params['registered']) {
        console.log('registered');
        return;
      }
      if (params['accessDenied']) {
        console.log('pls login');
        return;
      }
    })
  }

  public ngOnDestroy(): void {
    this.subs$.next();
  }
  
  public onSubmit(): void {
    this.form.disable();

    this.auth.login(this.form.value)
      .pipe(
        take(1),
        takeUntil(this.subs$)
      )
      .subscribe((data => {
        this.router.navigate(['/overview']);
        console.log(data);
      }),
        (err) => {
          this.form.enable();
          console.warn(err)
        })
  }
}
