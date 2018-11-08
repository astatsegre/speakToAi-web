import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private socket;

  constructor(private http: HttpClient
  ) { }
  public connect() {
    this.socket = io('https://localhost:3000/expand', {query: 'name=eeeerrrrr&room=Public+room+1'});
  }
  public getRooms(): Observable<any> {
    return this.http.get('https://localhost:3000/expand');
  }
}
