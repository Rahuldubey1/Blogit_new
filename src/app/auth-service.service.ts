import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter,Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  data:any
  value:any
  profile:any
  profile1:any

  constructor(private http:HttpClient) { }
  setData(value:any){
    this.data = value
  }
  getData(){
    return this.data
  }
  setValue(data:any){
    this.value = data
    // console.log(this.value)
  }
  getValue() {
    return this.value
  }
  setProfile(data:any){
    this.profile = data
  }
  setProfile1(data:any){
    this.profile1 = data
  }
  getProfile(){
    return this.profile
  }
  getProfile1(){
    return this.profile1
  }

  login(data:any):Observable<any>{
    var user = {
      'user':data
    }
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
    return this.http.put(`https://conduit.productionready.io/api/user`,user,{headers});
  }
  addLike(data:any):Observable<any>{
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.post(` https://conduit.productionready.io/api/articles/${data}/favorite`,'',{headers});
    
  }
  removeLike(data:any):Observable<any>{
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.delete(` https://conduit.productionready.io/api/articles/${data}/favorite`,{headers});
  }
  getTag(){
    return this.http.get(` https://conduit.productionready.io/api/tags`);
  }
  follow(data:any):Observable<any>{
    alert(data)
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.post(`https://conduit.productionready.io/api/profiles/${data}/follow`,'',{headers});
  }
  unFollow(data:any):Observable<any>{
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.delete(` https://conduit.productionready.io/api/profiles/${data}/follow`,{headers});
  }
  getFilteredBlog(data:any):Observable<any>{
    return this.http.get(`https://conduit.productionready.io/api/articles/?tag=${data}`);
  }
  getSelectedProfile(data:any):Observable<any>{
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.get(`https://conduit.productionready.io/api/articles/?author=${data}`,{headers});
  }
  showFavBlog(data:any):Observable<any>{
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.get(`https://conduit.productionready.io/api/articles/?favorited=${data}`,{headers});
  }
}
