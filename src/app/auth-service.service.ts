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
  profile2:any
  editData:any

  constructor(private http:HttpClient) { }
  setData(value:any){
    this.data = value
    this.data = value
  }
  getData(){
    return this.data
  }
  setEditData(value:any){
    this.editData = value
  }
  getEditData(){
    return this.editData
  }

  setValue(data:any){
    this.value = data
  }
  getValue() {
    return this.value
  }
  setProfile(data:any){
    console.log(data)
    this.profile = data
  }
  setProfile1(data:any){
    this.profile1 = data

  }
  setProfile2(data:any){
    this.profile2 = data
  }
  getProfile(){
    return this.profile
  }
  getProfile1(){
    return this.profile1
  }
  getProfile2(){
    return this.profile2
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
  getUser():Observable<any>{
    var token:any = localStorage.getItem("token");
    return this.http.get(`https://conduit.productionready.io/api/user`,{
      headers: new HttpHeaders({
        'Authorization': 'Token '+ token
      })
    });

  }
  getPost():Observable<any> {
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
  updateArticle(data:any,slug:any):Observable<any> {
    // let title = data.title
    // let description = data.description
    // let body = data.body
    // var article = {
    //   'article':data
    // }
    var token:any = localStorage.getItem("token");

    const headers = { 'Authorization':'Token '+ token };
    return this.http.put(`https://conduit.productionready.io/api/articles/${slug}`,data,{headers})
  }
  addArticle(data:any):Observable<any> {
    alert("hello")
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
    return this.http.get(`https://conduit.productionready.io/api/articles/?favorited=${data}`);
  }
  getComment(data:any){
    return this.http.get(`https://conduit.productionready.io/api/articles/${data}/comments`);
  }
  deleteComment(data:any){
    let id = data.id
    let slug = data.slug
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}/comments/${id}`,{headers});
  }
  deleteArticle(data:any){
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.delete(`https://conduit.productionready.io/api/articles/${data.slug}`,{headers});

  }
  getUserProfile(data:any){
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.get(`https://conduit.productionready.io/api/profiles/${data}`,{headers});
  }
  getclickedBlog(data:any){
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    return this.http.get(`https://conduit.productionready.io/api/articles/${data}`,{headers});

  }
}
