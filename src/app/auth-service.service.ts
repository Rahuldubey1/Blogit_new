import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter,Output } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    // if (totalPages <= 10) {
    //     // less than 10 total pages so show all
    //     startPage = 1;
    //     endPage = totalPages;
    // } else {
    //     // more than 10 total pages so calculate start and end pages
    //     if (currentPage <= 6) {
    //         startPage = 1;
    //         endPage = 10;
    //     } else if (currentPage + 4 >= totalPages) {
    //         startPage = totalPages - 9;
    //         endPage = totalPages;
    //     } else {
    //         startPage = currentPage - 5;
    //         endPage = currentPage + 4;
    //     }
    // }
    
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage+2;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}
  data:any
  value:any
  profile:any
  profile1:any
  profile2:any
  editData:any
  limit:number = 10
  offset:number = 0
  count:any
  filter:any
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
  setCount(data:any){
    this.count = data
  }
  getCount(){
    return this.count
  }
  setLimit(data:any){

    this.filter = data

  }
  getLimit(){
    return this.filter
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
  getPost(number:any):Observable<any> {
    if((number == 10 || number == 20 || number == 50)){
      this.offset = 0
      this.limit = number
    } else {
      if(this.limit == 20){
        this.offset = number * 20
      } 
      else if(this.limit == 50){
        this.offset = number * 50
      }
      else {
        this.offset = number * 10
      }
    }
    return this.http.get(`https://conduit.productionready.io/api/articles?limit=${this.limit}&offset=${this.offset}`)
  }
  getToken() {
    return  localStorage.getItem("token");
  }
  getFeed(data:any,number:any):Observable<any> {
    if((number == 10 || number == 20 || number == 50)){
      this.offset = 0
      this.limit = number
    } else {
      if(this.limit == 20){
        this.offset = number * 20
      } 
      else if(this.limit == 50){
        this.offset = number * 50
      }
      else {
        this.offset = number * 10
      }
    }
    return this.http.get(`https://conduit.productionready.io/api/articles/feed?limit=${this.limit}&offset=${this.offset}`,{
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
  getFilteredBlog(data:any,number:any):Observable<any>{
    if((number == 10 || number == 20 || number == 50)){
      this.offset = 0
      this.limit = number
    } else {
      if(this.limit == 20){
        this.offset = number * 20
      } 
      else if(this.limit == 50){
        this.offset = number * 50
      }
      else {
        this.offset = number * 10
      }
    }
    return this.http.get(`https://conduit.productionready.io/api/articles/?limit=${this.limit}&offset=${this.offset}?tag=${data}`);
  }
  getSelectedProfile(data:any,number:any):Observable<any>{
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    this.limit=10
    this.offset = number * 10
    if(token) {
      return this.http.get(`https://conduit.productionready.io/api/articles/?author=${data}&limit=${this.limit}&offset=${this.offset}`,{headers});
    } else {
      return this.http.get(`https://conduit.productionready.io/api/articles/?author=${data}&limit=${this.limit}&offset=${this.offset}`,);

    }
  }
  showFavBlog(data:any,number:any):Observable<any>{
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    this.limit=10
    this.offset = number * 10
    if(token){
      return this.http.get(`https://conduit.productionready.io/api/articles/?favorited=${data}&limit=${this.limit}&offset=${this.offset}`,{headers});
    } else {
      return this.http.get(`https://conduit.productionready.io/api/articles/?favorited=${data}&limit=${this.limit}&offset=${this.offset}`);

    }
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
    if(token) {
      return this.http.get(`https://conduit.productionready.io/api/profiles/${data}`,{headers});
    } else {
      return this.http.get(`https://conduit.productionready.io/api/profiles/${data}`);
    }
  }
  getclickedBlog(data:any){
    var token:any = localStorage.getItem("token");
    const headers = { 'Authorization':'Token '+ token };
    if(token) {
      return this.http.get(`https://conduit.productionready.io/api/articles/${data}`,{headers});
    } else { 
      return this.http.get(`https://conduit.productionready.io/api/articles/${data}`);

    }
  }
}
