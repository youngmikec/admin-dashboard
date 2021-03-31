import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, Admin } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Admins{
    freexitUsers: Array<Admin> = [];

    constructor(
        private env: EnvService,
        private apiService: ApiService
    ){

    }

    // constructor(private apiService: ApiService,
    //             private env: EnvService) {
    //   const pmlusers = []; // Initial Values
    //   for (const pmluser of pmlusers) {
    //     this.pmlusers.push(new Pmluser(pmluser));
    //   }
    //   this.recordRetrieve();
    // }
  
    query(params?: any) {
      if (!params) {
        return this.freexitUsers;
      }
      return this.freexitUsers.filter((user) => {
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
  
    add(user: Admin) {
      this.freexitUsers.push(user);
    }
  
    delete(user: Admin) {
      this.freexitUsers.splice(this.freexitUsers.indexOf(user), 1);
    }
  
    // CRUD Service
    // async recordRetrieve(queryString = '?sort=-createdAt'): Promise<ApiResponse> {
    async recordRetrieve(queryString = '' ): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/admin${queryString}`;
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
      const url = `${this.env.API_URL}/admin`;
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
  
    async recordUpdate(user: Admin, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/admin/${user.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(user);
            this.recordRetrieve().then(res =>{
                this.freexitUsers = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordDelete(user: Admin): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/admin/${user.id}`;
      const proRes = this.apiService.deleteApi(url).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(user);
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }

    async sendOTP(record: any): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/admin/otp`;
      const proRes = this.apiService.postApi(url, record).pipe(
        map((res: ApiResponse) => {
            console.log(res);
           if (res.success) {
               console.log('OTP sent');
           } else {
               throwError(res.message);
           }
           return res;
        }));
      return await proRes.toPromise();
  }
}