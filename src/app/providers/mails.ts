import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, Mail } from '../models';
import { EnvService, ApiService } from '../services';


@Injectable()
export class Mails {

    records: Array<Mail> = [];

    constructor (private env: EnvService,
        private apiService: ApiService) {
      for (const item of this.records) {
        this.records.push(new Mail(item));
      }
      this.recordRetrieve();
    }

    query(params?: any) {
      if (!params) {
        return this.records;
      }
      return this.records.filter((item) => {
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = item[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return item;
            } else if (field === params[key]) {
              return item;
            }
          }
        }
        return null;
      });
    }
  
    add(record: Mail) {
      this.records.push(record);
    }
  
    delete(record: Mail) {
      this.records.splice(this.records.indexOf(record), 1);
    }
  
    // CRUD Service
    async recordRetrieve(queryString = ''): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/mail/${queryString}`;
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
      const url = `${this.env.API_URL}/mail`;
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
  
    async recordUpdate(record: Mail, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/mail/${record.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(record);
            this.recordRetrieve().then(res =>{
                this.records = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordDelete(record: Mail): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/mail/${record.id}`;
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