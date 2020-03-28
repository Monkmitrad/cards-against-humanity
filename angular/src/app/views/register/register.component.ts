import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  registerSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.email;
    const username = form.value.username;

    this.authService.signup(email, password, username).subscribe(() => {
      this.router.navigate(['/game']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
    });
    form.reset();
  }
}
