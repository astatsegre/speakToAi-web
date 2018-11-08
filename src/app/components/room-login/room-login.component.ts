import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../services/room.service';
import {first} from 'rxjs/operators';

interface IRoom {
  roomSocketId: string;
  count: number;
}


@Component({
  selector: 'app-room-login',
  templateUrl: './room-login.component.html',
  styleUrls: ['./room-login.component.scss']
})
export class RoomLoginComponent implements OnInit {
  public roomList: IRoom[];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getRooms().pipe(first()).subscribe((roomList: {rooms: IRoom[]}) => {
      this.roomList = roomList.rooms;
    });
  }
  public submit() {
    this.roomService.connect();
    console.log('works');
  }

}
