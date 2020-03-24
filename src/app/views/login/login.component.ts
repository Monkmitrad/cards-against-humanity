import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  error: string = null;

  constructor(private authService: AuthService) {}

  loginSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.authService.signin(email, password).subscribe(resData => {
      console.log(resData);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
    });

    form.reset();
  }
}
