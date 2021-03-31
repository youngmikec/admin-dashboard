import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { getLocalStorage } from '../helpers';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EnvService {

  public API_URL = environment.CURRENT_URL;
  // public CENTRAL_API = 'http://63.34.89.156/api';
  // public LOCAL_API = 'http://127.0.0.1:5111/api';
  // public apiMode: 'ONLINE' | 'OFFLINE' = 'ONLINE';

  constructor(private connection: ConnectionService) {
    // this.setApiMode(true);
    // this.connection.monitor().subscribe(this.setNetworkState.bind(this));
    // this.monitor().subscribe(this.setApiMode.bind(this));
  }

  // monitor(): Observable<boolean> {
  //   return new Observable<boolean>(subscriber => {
  //     setInterval(() => {
  //       subscriber.next(getLocalStorage('API_MODE') !== 'OFFLINE');
  //     }, 10000);
  //     subscriber.next(getLocalStorage('API_MODE') !== 'OFFLINE');
  //   });
  // }

  // setNetworkState(isConnected: boolean): void {
  //   if (isConnected && this.apiMode === 'ONLINE') {
  //     this.API_URL = this.CENTRAL_API;
  //   } else {
  //     this.API_URL = this.LOCAL_API;
  //   }
  //   console.log(`${this.apiMode} ${this.API_URL}`);
  // }

  // setApiMode(isOnline): void {
  //   this.apiMode = isOnline ? 'ONLINE' : 'OFFLINE';
  //   this.setNetworkState(window.navigator.onLine);
  // }

}
