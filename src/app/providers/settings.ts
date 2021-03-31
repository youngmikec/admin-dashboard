import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, User, Setting } from '../models'
import { EnvService, ApiService } from '../services';




@Injectable()

export class Settings {
  settings: Array<Setting> = [];

  constructor(
    private env: EnvService,
    private apiService: ApiService) {
    // Initial Values
    for (const setting of this.settings) {
      this.settings.push(new Setting(setting));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.settings;
    }
    return this.settings.filter((setting) => {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const field = setting[key];
          if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
            return setting;
          } else if (field === params[key]) {
            return setting;
          }
        }
      }
      return null;
    });
  }

  add(record: Setting) {
    this.settings.push(record);
  }

  delete(record: Setting) {
    this.settings.splice(this.settings.indexOf(record), 1);
  }

  // CRUD Service
  // async recordRetrieve(queryString = '?sort=-createdAt'): Promise<ApiResponse> {
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/setting${queryString}`;
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
    const url = `${this.env.API_URL}/setting`;
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

  async recordUpdate(record: Setting, payload): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/setting/${record.id}`;
    const proRes = this.apiService.updateApi(url, payload).pipe(
      map((res: ApiResponse) => {
        if (res.success) {
          this.delete(record);
          this.recordRetrieve().then(res => {
            this.settings = res.payload;
          })
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

  async recordDelete(record: Setting): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/setting/${record.id}`;
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