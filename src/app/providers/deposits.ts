import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiResponse, Deposit } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Deposits{
    deposits: Array<Deposit> = [];

    constructor(
        private env: EnvService,
        private apiService: ApiService
    ){}

    query(params?: any) {
      if (!params) {
        return this.deposits;
      }
      return this.deposits.filter((user) => {
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
  
    add(record: Deposit) {
      this.deposits.push(record);
    }
  
    delete(record: Deposit) {
      this.deposits.splice(this.deposits.indexOf(record), 1);
    }
  
    // CRUD Service
    // async recordRetrieve(queryString = '?sort=-createdAt'): Promise<ApiResponse> {
    async recordRetrieve(queryString = '' ): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/deposit${queryString}`;
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
      const url = `${this.env.API_URL}/deposit`;
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
  
    async recordUpdate(record: Deposit, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/deposit/${record.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(record);
            this.recordRetrieve().then(res =>{
                this.deposits = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordDelete(record: Deposit): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/deposit/${record.id}`;
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