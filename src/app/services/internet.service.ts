import { Injectable } from "@angular/core"
import { BehaviorSubject, interval } from "rxjs"
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class InternetService {

  public connected$ = new BehaviorSubject<boolean>(false);
  private config = 'https://api.freexitnow.com/api';
  public connState: boolean;
  private source = interval(100000);

  constructor(private Http: HttpClient) {

    this.source.subscribe(() => {
      this.Http.get(this.config, { observe: 'response' })
        .pipe(first())
        .subscribe(resp => {
          if (resp.status === 200) {
            this.connected(true);
          } else {
            this.connected(false);
          }
        }), Err => this.connected(false);
    });
    this.connected$.subscribe(connected => {
      // console.log("\nInternet Connection: ", connected);
    });
  }

  connected(data: boolean) {
    this.connState = data;
    this.connected$.next(this.connState);
  }

}