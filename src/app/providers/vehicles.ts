import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, User, Vehicle } from '../models'
import { EnvService, ApiService } from '../services';




@Injectable()

export class Vehicles {
  vehicles: Array<Vehicle> = [];

  constructor(
    private env: EnvService,
    private apiService: ApiService) {
    // Initial Values
    for (const vehicle of this.vehicles) {
      this.vehicles.push(new Vehicle(vehicle));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.vehicles;
    }
    return this.vehicles.filter((vehicle) => {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const field = vehicle[key];
          if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
            return vehicle;
          } else if (field === params[key]) {
            return vehicle;
          }
        }
      }
      return null;
    });
  }

  add(record: Vehicle) {
    this.vehicles.push(record);
  }

  delete(record: Vehicle) {
    this.vehicles.splice(this.vehicles.indexOf(record), 1);
  }

  // CRUD Service
  // async recordRetrieve(queryString = '?sort=-createdAt'): Promise<ApiResponse> {
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/vehicle${queryString}`;
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
    const url = `${this.env.API_URL}/vehicle`;
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

  async recordUpdate(record: Vehicle, payload): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/user/${record.id}`;
    const proRes = this.apiService.updateApi(url, payload).pipe(
      map((res: ApiResponse) => {
        if (res.success) {
          this.delete(record);
          this.recordRetrieve().then(res => {
            this.vehicles = res.payload;
          })
        } else {
          throwError(res.message);
        }
        return res;
      }));
    return await proRes.toPromise();
  }

  async recordDelete(record: Vehicle): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/users/${record.id}`;
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