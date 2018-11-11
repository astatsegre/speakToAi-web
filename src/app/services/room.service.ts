import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {IExpand} from '../interfaces/expand.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private socket;

  constructor(private http: HttpClient
  ) { }
  public connect(name: string, room: string) {
    this.socket = io('https://localhost:3000/expand', {query: `name=${name}&room=${room}`});
  }
  public getRooms(): Observable<any> {
    return this.http.get('https://localhost:3000/expand');
  }
  public onExpand(): Observable<IExpand> {
    return new Observable((observer) => {
      this.socket.on('expand', (data) => {
        console.log('onExpand', data);
        observer.next(data);
      });
    });
  }
  public decodePartOfSpeach (p: 'n'|'v'|'a'|'r'): 'noun'|'verb'|'adjective'|'adverb'  {
    switch (p) {
      case 'n':
        return 'noun';
      case 'v':
        return 'verb';
      case 'a':
        return 'adjective';
      case 'r':
        return 'adverb';
    }
  }
}

// 'name=eeeerrrrr&room=Public+room+1'
