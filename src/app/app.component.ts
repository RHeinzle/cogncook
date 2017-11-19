import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string;
  pages: Array<{ title: string, component: string, icon: string }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    this.rootPage = 'Search';

    // set our app's pages
    this.pages = [
      { title: 'Search', component: 'Search', icon: 'search' },
      { title: 'Favorite', component: 'Favorite', icon: 'heart' },
      { title: 'About', component: 'Settings', icon: 'information-circle' },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  isActive(page): boolean {
    if (this.nav.getActive()) {
      if (this.nav.getActive().name === page.component) {
        return true;
      }
    }
    return false;
  }

  close() {
    this.menu.close();
  }
}
