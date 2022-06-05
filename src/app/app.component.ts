import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  featureClicked: string = 'recipes';
  onNavigationClicked(feature: string) {
    this.featureClicked = feature;
  }
}
