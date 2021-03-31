import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { LoginResponse, Admin } from '../models';
import { getLocalStorage, setLocalStorage, removeLocalStorage, cleanObject } from '../helpers';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token = null;
  depth = 0;
  user: Admin;

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private env: EnvService) {
    this.user = !this.user ? this.getUser() : this.user;
  }

  async postLogin(data, element): Promise<LoginResponse> {
    const payload = cleanObject(data);
    // console.log('auth.service: payload =>', payload, this.env.API_URL + '/admin/login');
    const response = this.http.post(this.env.API_URL + '/admin/login', payload)
      .pipe(tap((res: LoginResponse) => {
        element.removeClass('running');
        //  console.log('auth.service: res =>', res);
        if (res.success) {
          this.showNotification(`Login successful<br/>Welcome! FreexitNow`);
          const { user, token } = res.payload;
          this.user = user;
          if (setLocalStorage('user', user, null)) {
            //  console.log('User info stored');
          } else {
            console.error('Error storing record customer');
          }
          if (setLocalStorage('token', token, null)) {
            //   console.log('Token string stored');
          } else {
            console.error('Error storing record token');
          }
          const goingTo = payload.otp ? '/forgot-password' : '/dashboard';
          this.token = token;
          this.isLoggedIn = true;
          // const intendURL = getLocalStorage('intendURL') === null ? goingTo : getLocalStorage('intendURL');
          this.router.navigate([goingTo]);
        } else {
          this.showNotification(res.message);
          this.token = null;
          this.isLoggedIn = false;
        }
      }, (err) => {
        element.removeClass('running');
        this.showNotification('Error processing. Check your Internet and Try Again');
        this.token = null;
        this.isLoggedIn = false;
      }));
    return await response.toPromise();
  }


  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }

  register(data: any) {
    const payload = cleanObject(data);
    return this.http.post(this.env.API_URL + '/admin', payload);
  }

  getUser(): Admin {
    if (!!this.user) return this.user;
    return getLocalStorage('user');
  }

  public async getToken(): Promise<any> {
    try {
      const token = await getLocalStorage('token');
      if (token != null) {
        this.token = token;
        this.isLoggedIn = true;
      } else {
        this.token = null;
        this.isLoggedIn = false;
      }
      return token;
    } catch (e) {
      console.log(e);
      alert(JSON.stringify(e));
      return null;
    }
  }

  userLogOut(): void {
    this.isLoggedIn = false;
    delete this.token;
    removeLocalStorage('user');
    removeLocalStorage('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return (!!getLocalStorage('user')) ? true : false;
  }

}
