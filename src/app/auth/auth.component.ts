import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {authResponseData, AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLogged = true;
  isLoading = false;
  error: string = '';
  constructor(
    private authSrv: AuthService,
    private router: Router
  ) {
  }

  onSwitchMode(){
    this.isLogged = !this.isLogged;
  }
  onSubmit(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<authResponseData>;
    if (this.isLogged) {
      authObs = this.authSrv.login(email,password);
    } else {
      authObs = this.authSrv.signUp(email, password);
    }
    authObs.subscribe(response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
