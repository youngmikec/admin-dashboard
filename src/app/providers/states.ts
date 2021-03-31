import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, State } from '../models';
import { EnvService, ApiService } from '../services';


@Injectable()
export class States {

    records: Array<State> = [];

    constructor (private env: EnvService,
        private apiService: ApiService) {
      for (const item of this.records) {
        this.records.push(new State(item));
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
  
    add(record: State) {
      this.records.push(record);
    }
  
    delete(record: State) {
      this.records.splice(this.records.indexOf(record), 1);
    }
  
    // CRUD Service
    async recordRetrieve(queryString = ''): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/state/${queryString}`;
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
      const url = `${this.env.API_URL}/state`;
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
  
    async recordUpdate(record: State, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/state/${record.id}`;
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
  
    async recordDelete(record: State): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/state/${record.id}`;
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