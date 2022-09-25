import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLoggedIn = false;
  private userSub: Subscription | undefined;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {
  }
  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user => {
      this.isLoggedIn = !!user;
    });
  }
  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
  onLogout() {
    this.authService.logout();
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
