import { Component } from '@angular/core';
import { StatusTracker, TrackingTarget } from 'src/classes/business-layer/StatusTracker';
import { Status } from 'src/classes/dalc/StatusCheckAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vendor-health-web';

  public amazonStatusHistory: Status[] = [];
  public googleStatusHistory: Status[] = [];
  public allStatusHistory: Status[] = [];  //think about how this should look different than the others...

  constructor(
    private amazonTracker: StatusTracker,
    private googleTracker: StatusTracker,
    private allTracker: StatusTracker
  ){

    this.initializeTrackers();
  }

  //TODO: there seems to be a bug somewhere here, probably with the injection, didn't have time to fix it
  private initializeTrackers() {
    this.amazonTracker.startTracking(TrackingTarget.Amazon).subscribe(statusHistory => {
      this.amazonStatusHistory = statusHistory;
    })

    this.googleTracker.startTracking(TrackingTarget.Google).subscribe(statusHistory => {
      this.googleStatusHistory = statusHistory;
    })

    this.allTracker.startTracking(TrackingTarget.All).subscribe(statusHistory => {
      this.allStatusHistory = statusHistory;
    })
  }
}
