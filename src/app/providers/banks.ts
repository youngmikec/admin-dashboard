import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiResponse, Bank } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Banks {
    banks: Array<Bank> = [];

    constructor(
        private env: EnvService,
        private apiService: ApiService
    ){}
  
    query(params?: any) {
      if (!params) {
        return this.banks;
      }
      return this.banks.filter((user) => {
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
  
    add(record: Bank) {
      this.banks.push(record);
    }
  
    delete(record: Bank) {
      this.banks.splice(this.banks.indexOf(record), 1);
    }
  
    // CRUD Service
    // async recordRetrieve(queryString = '?sort=-createdAt'): Promise<ApiResponse> {
    async recordRetrieve(queryString = '' ): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/bank${queryString}`;
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
      const url = `${this.env.API_URL}/bank`;
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
  
    async recordUpdate(record: Bank, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/user/${record.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(record);
            this.recordRetrieve().then(res =>{
                this.banks = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordDelete(record: Bank): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/bank/${record.id}`;
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