import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import { Recipe } from '../../model/recipe';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class Details {

  tabs: IScrollTab[] = [];
  selectedTab: IScrollTab;
  tabNames = [
    {
      name: 'Method'
    },
    {
      name: 'Ingredients'
    },
    {
      name: 'Nutrition'
    }
  ];
  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  recipe: Recipe;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private modalCtrl: ModalController) {

    if (this.navParams.get('recipe')) {
      this.recipe = this.navParams.get('recipe');
    } else {
      this.recipe = new Recipe();
      this.navCtrl.push('Search');
    }

    this.tabNames.forEach(tab => {
      this.tabs.push(tab);
    })

  }

  ionViewDidLoad() {
    this.scrollTab.go2Tab(0);
  }

  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
  }

  swipeEvent($e) {
    console.log('before', $e.direction);
    switch ($e.direction) {
      case 2: // left
        this.scrollTab.nextTab();
        break;
      case 4: // right
        this.scrollTab.prevTab();
        break;
    }
  }

  share() {
    let modal = this.modalCtrl.create('Share', {recipe: this.recipe},{
      enterAnimation: 'modal-md-slide-in',
      leaveAnimation: 'modal-md-slide-out'
    });
    modal.present();
  }

}
