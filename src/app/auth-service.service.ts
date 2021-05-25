import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter,Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  data:any
  value:any

  constructor(private http:HttpClient) { }
  setData(value:any){
    this.data = value
  }
  getData(){
    return this.data
  }
  setValue(data:any){
    this.value = data
    console.log(this.value,"set")
  }
  getValue() {
    alert("11")
    return this.value
  }

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
    return this.http.post(`https://conduit.productionready.io/api/users`,user);
  }
  getUser(data:any):Observable<any>{
    return this.http.get(`https://conduit.productionready.io/api/user`,{
      headers: new HttpHeaders({
        'Authorization': 'Token '+ data
      })
    });

  }
  getPost(data:any):Observable<any> {
    return this.http.get(`https://conduit.productionready.io/api/articles`)
  }
  getToken() {
    return  localStorage.getItem("token");
  }
  getFeed(data:any):Observable<any> {
    return this.http.get(`https://conduit.productionready.io/api/articles/feed`,{
      headers: new HttpHeaders({
        'Authorization': 'Token '+ data
      })
    })
  }
  addComment(data:any):Observable<any> {
    const headers = { 'Authorization':'Token '+ data.token };
    const body = { body: data.body  };
      return this.http.post(`https://conduit.productionready.io/api/articles/${data.slug}/comments`,body,{headers})
      // headers: new HttpHeaders({
      //   'Authorization': 'Token '+ data.token
      // })
  }
  updateArticle(data:any):Observable<any> {
    let title = data.title
    let description = data.description
    let body = data.body
    var token:any = localStorage.getItem("token");
    // const body1 = {body : data};
    // console.log(body1)
    var article = {
      'article':data
    }
    console.log(article)
    const headers = { 'Authorization':'Token '+ token };
    return this.http.post(`https://conduit.productionready.io/api/articles/?title=${title}&description=${description}&body=${body}`,article,{headers})
  }
  addArticle(data:any):Observable<any> {
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    var article = {
      'article':data
    }
    return this.http.post(`https://conduit.productionready.io/api/articles`,data,{headers});
  }
  updateUser(data:any):Observable<any> {
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    var user = {
      'user':data
    }
    console.log(user)
    return this.http.put(`https://conduit.productionready.io/api/user`,user,{headers});
  }
  addLike(data:any):Observable<any>{
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.post(` https://conduit.productionready.io/api/articles/${data}/favorite`,'',{headers});
    
  }
}
