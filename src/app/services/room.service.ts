import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {IExpand, IGuess} from '../interfaces/expand.interface';

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
    return this.getObservable('expand');
  }
  public onGuess(): Observable<IGuess> {
    return this.getObservable('guess');
  }
  public sendExpand(text: string) {
    this.socket.emit('expand', text);
  }
  public sendGuess(indexesOfWords: number[]): void {
    this.socket.emit('guess', indexesOfWords);
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
  public renderExpandSentence(e) {
    // e[2] contains the target word index
    // e[0] contains the sentence tokens for example, ['Why', ',', 'why', 'me', ',', 'Lord!']
    // spaces are not included, so they are added here.
    // replacing a/an (like correcting the sentence "I ate a apple" to "I ate an apple")
    // is something #TO_DO in this and (especially) other functions

    /*if (!e) {
      return "No example to evaluate. Wait for the next round to join the game"
    }
    let w_ind = e[2]

    e[0][w_ind] = "<span class=target>" + e[0][w_ind] + "</span>"
    e = e[0].join(" ")
    var regex = / ([:',;.!?])/g;
    e = e.replace(regex, "$1")
    return(e)*/
  }
  private getObservable(socketName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(socketName, (data) => {
        console.log(socketName, data);
        observer.next(data);
      });
    });
  }
}

// 'name=eeeerrrrr&room=Public+room+1'
