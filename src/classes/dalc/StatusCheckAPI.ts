import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class StatusCheckAPI {

    private static apiBaseURL: string = "http://localhost/v1"

    constructor(private http: HttpClient) {
    }

    public getAmazonStatus(): Observable<Status> {
        var url = StatusCheckAPI.apiBaseURL + "/amazon-status";

        return this.http.get<Status>(url, {
            observe: "body",
            responseType: "json",
        })
    }

    public getGoogleStatus(): Observable<Status> {
        var url = StatusCheckAPI.apiBaseURL + "/google-status";

        return this.http.get<Status>(url, {
            observe: "body",
            responseType: "json",
        })
    }

    public getAllStatus(): Observable<Status[]> {
        var url = StatusCheckAPI.apiBaseURL + "/all-status";

        return this.http.get<Status[]>(url, {
            observe: "body",
            responseType: "json",
        })
    }
}

export interface Status {
    url: string;
    statusCode: number;
    duration: number;
    date: number;
}
