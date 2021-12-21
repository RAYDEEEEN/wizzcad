import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@core/services/login/login.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from '@shared/interfaces/login.interface';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public get passwordControl(): AbstractControl {
    return this.loginForm.get('password');
  }

  public get loginControl(): AbstractControl {
    return this.loginForm.get('login');
  }

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.loginService
      .connection(this.loginForm.value.login, this.loginForm.value.password)
      .pipe(untilDestroyed(this))
      .subscribe((users: User[]) => {
        if (users.length > 0) {
          this.loginService.token = users[0].token;
          this.router.navigate(['home']);
        }
      });
  }
}
