import { Observable, Subscription, timer } from "rxjs";
import { Status, StatusCheckAPI } from "../dalc/StatusCheckAPI";
import { Injectable } from "@angular/core";


export enum TrackingTarget {
    Amazon,
    Google,
    All
}

@Injectable()
export class StatusTracker {

    private static checkInterval = 5000; //1 min in milis 

    public statusHistory: Status[] = [];

    constructor(
        private statusAPI: StatusCheckAPI
    ) {
    }

    //TODO: there seems to be a bug somewhere here, didn't have time to fix it
    public startTracking(target: TrackingTarget): Observable<Status[]> {
        //create obserable that gives status updates
        return new Observable<Status[]>(observer => {
            var timerSub: Subscription = timer(0, StatusTracker.checkInterval).subscribe(t => {
                console.log(this.statusHistory);
                //pretty sure there is a way to pipe this...
                //TODO: structure this better
                switch (target) {
                    case TrackingTarget.Amazon:
                        this.statusAPI.getAmazonStatus().subscribe(status => {
                            this.statusHistory.push(status);
                            observer.next(this.statusHistory);
                        });
                        break;
                    case TrackingTarget.Google:
                        this.statusAPI.getGoogleStatus().subscribe(status => {
                            this.statusHistory.push(status);
                            observer.next(this.statusHistory);
                        });
                        break;
                    case TrackingTarget.All:
                        this.statusAPI.getAllStatus().subscribe(status => {
                            this.statusHistory.concat(status);  //not really differenciating between this endpooint and the others on the UI with this
                            observer.next(this.statusHistory);
                        });
                        break;
                }
            });

            return {
                unsubscribe() {
                    timerSub.unsubscribe();
                }
            }
        });
    }


}