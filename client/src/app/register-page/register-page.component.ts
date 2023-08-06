import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { take, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subs$.next();
  }

  public onSubmit(): void {
    this.form.disable();

    this.auth.register(this.form.value)
      .pipe(
        take(1),
        takeUntil(this.subs$)
      )
      .subscribe((data => {
        this.router.navigate(['/login'], {
          queryParams: {
            registred: true,
          }
        })
        console.log(data);
      }),
        (err) => {
          this.form.enable();
          console.warn(err)
        }
      )
  }

}
