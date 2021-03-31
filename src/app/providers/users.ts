import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiResponse, User } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Users{
    users: Array<User> = [];

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
        return this.users;
      }
      return this.users.filter((user) => {
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
  
    add(user: User) {
      this.users.push(user);
    }
  
    delete(user: User) {
      this.users.splice(this.users.indexOf(user), 1);
    }
  
    // CRUD Service
    // async recordRetrieve(queryString = '?sort=-createdAt'): Promise<ApiResponse> {
    async recordRetrieve(queryString = '' ): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/user${queryString}`;
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
      const url = `${this.env.API_URL}/user`;
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
  
    async recordUpdate(user: User, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/user/${user.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(user);
            this.recordRetrieve().then(res =>{
                this.users = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordDelete(user: User): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/user/${user.id}`;
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
      const url = `${this.env.API_URL}/user/otp`;
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