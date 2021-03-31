import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, Parcel } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Tracks {
  parcels: Array<Parcel> = [];

  constructor(
    private env: EnvService,
    private apiService: ApiService
  ) { }

  query(params?: any) {
    if (!params) {
      return this.parcels;
    }
    return this.parcels.filter((pickup) => {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const field = pickup[key];
          if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
            return pickup;
          } else if (field === params[key]) {
            return pickup;
          }
        }
      }
      return null;
    });
  }

  add(record: Parcel) {
    this.parcels.push(record);
  }

  delete(record: Parcel) {
    this.parcels.splice(this.parcels.indexOf(record), 1);
  }

  // CRUD Service
  // async recordRetrieve(queryString = '?sort=-createdAt'): Promise<ApiResponse> {
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/parcel/tracking/${queryString}`;
    const proRes = this.apiService.getApi(url).pipe(
      map((res: ApiResponse) => {
        console.log(res);
        if (res.success && res.payload.length > 0) {
          res.payload.forEach(element => {
            this.add(element);
          });
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }


}