import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, Pickup } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Pickups{
    freexitPickups: Array<Pickup> = [];

    constructor(
        private env: EnvService,
        private apiService: ApiService
    ){

    }
  
    query(params?: any) {
      if (!params) {
        return this.freexitPickups;
      }
      return this.freexitPickups.filter((pickup) => {
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
  
    add(pickup: Pickup) {
      this.freexitPickups.push(pickup);
    }
  
    delete(pickup: Pickup) {
      this.freexitPickups.splice(this.freexitPickups.indexOf(pickup), 1);
    }
  
    // CRUD Service
    // async recordRetrieve(queryString = '?sort=-createdAt'): Promise<ApiResponse> {
    async recordRetrieve(queryString = ''): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/pickup${queryString}`;
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
  
    async recordCreate(data): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/pickup`;
      const proRes = this.apiService.postApi(url, data).pipe(
        map((res: ApiResponse) => {
          if (res.success && res.payload) {
            console.log('recordCreate() successful');
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordUpdate(pickup: Pickup, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/pickup/operation/${pickup.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(pickup);
            this.recordRetrieve().then(res =>{
                this.freexitPickups = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordDelete(pickup: Pickup): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/pickup/${pickup.id}`;
      const proRes = this.apiService.deleteApi(url).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(pickup);
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
}