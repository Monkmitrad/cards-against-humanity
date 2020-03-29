import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  loginSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.authService.signin(email, password).subscribe((data) => {
      this.router.navigate(['/game']);
    }, errorMessage => {
      this.error = errorMessage;
    });
    form.reset();
  }
}
