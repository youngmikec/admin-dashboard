import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiResponse, Shipment } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Shipments {
    shipments: Array<Shipment> = [];

    constructor(
        private env: EnvService,
        private apiService: ApiService
    ){}
  
    query(params?: any) {
      if (!params) {
        return this.shipments;
      }
      return this.shipments.filter((user) => {
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = user[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return user;
            } else if (field === params[key]) {
              return user;
            }
          }
        }
        return null;
      });
    }
  
    add(record: Shipment) {
      this.shipments.push(record);
    }
  
    delete(record: Shipment) {
      this.shipments.splice(this.shipments.indexOf(record), 1);
    }
  
    // CRUD Service
    async recordRetrieve(queryString = '' ): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/shipment${queryString}`;
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
      const url = `${this.env.API_URL}/shipment`;
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
  
    async recordUpdate(record: Shipment, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/shipment/${record.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(record);
            this.recordRetrieve().then(res =>{
                this.shipments = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordDelete(record: Shipment): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/shipment/${record.id}`;
      const proRes = this.apiService.deleteApi(url).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(record);
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }

}