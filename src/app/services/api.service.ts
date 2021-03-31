import { Injectable } from '@angular/core';
import { Observable, of, from, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, retry, map, timeout } from 'rxjs/operators';
// import { timeout } from 'rxjs/operators/timeout';
import { Router } from '@angular/router';
import { EnvService } from './env.service';
import { cleanObject, safeGet } from '../helpers';


const API_ACCESS_KEY = 'jeNeSais-pas';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  // params: new HttpParams({ fromString: `apiKey=${API_ACCESS_KEY}` })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  depth = 0;

  constructor(private http: HttpClient,
    private env: EnvService,
    private router: Router) { }

  private handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      console.error(`\n\n::Frontend Error: ${error}\n\n`);
    } else {
      console.error(`\n\n::Backend Error:\n\n`);
    }
    console.log('ApiService =>', safeGet(error,'message'));
    // return throwError(error.error); // Already extracted by ErrorInterceptor
    return throwError(error);
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getApi(url: string): Observable<any> {
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postApi(url: string, data): Observable<any> {
    const payload = cleanObject(data);
    return this.http.post(url, payload, httpOptions)
    // .map(res => res.json())
    .pipe(catchError(this.handleError));
  }

  updateApi(url: string, data): Observable<any> {
    const payload = cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
      retry(1),
        catchError(this.handleError)
      );
  }

  patchApi(url: string, data = {}): Observable<any> {
    return this.http.patch(url, data, httpOptions).pipe(
      retry(3),
        catchError(this.handleError)
      );
  }

  deleteApi(url: string): Observable<{}> {
    return this.http.delete(url, httpOptions).pipe(
      retry(3),
        catchError(this.handleError)
      );
  }

}
