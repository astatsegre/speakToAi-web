import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient
  ) { }
  public getRooms(): Observable<any> {
    return this.http.get('https://localhost:3000/expand');
  }
}
