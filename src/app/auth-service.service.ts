import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  login(data:any):Observable<any>{
    var user = {
      'user':data
    }
    console.log("I am server")
    console.log(user)
    return this.http.post(`https://conduit.productionready.io/api/users/login`,user);
  }
  signup(data:any):Observable<any>{
    var user = {
      'user':data
    }
    console.log("I am server")
    console.log(user)
    return this.http.post(`https://conduit.productionready.io/api/users`,user);
  }
  getUser(data:any):Observable<any>{
    return this.http.post(`https://conduit.productionready.io/api/user`,user);

  }
}
