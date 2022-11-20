import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {authResponseData, AuthService} from "../services/auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLogged = true;
  isLoading = false;
  error: string = '';
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective | undefined;
  private errorSub: Subscription | undefined;
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }
  onHandleError () {
    this.error = '';
  }

  private showErrorAlert(errorMessage: string) {
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost?.viewContainerRef
    hostViewContainerRef?.clear();
    const componentRef = hostViewContainerRef?.createComponent(alertCompFactory);
    // @ts-ignore
    componentRef.instance.message = errorMessage;
    // @ts-ignore
    this.errorSub = componentRef.instance.close.subscribe(() => {
      this.errorSub?.unsubscribe();
      hostViewContainerRef?.clear();
    });
  }
  ngOnDestroy() {
    if (this.errorSub) {
      this.errorSub?.unsubscribe();
    }
  }
}
