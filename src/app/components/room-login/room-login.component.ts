import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

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
  @ViewChild('roomLogin')roomLogin: NgForm;
  public roomList: IRoom[];

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit() {
    this.roomService.getRooms().pipe(first()).subscribe((roomList: {rooms: IRoom[]}) => {
      this.roomList = roomList.rooms;
    });
  }
  public submit() {
    const name = this.roomLogin.value.name;
    const room = this.roomLogin.value.room.split(' ').join('+');
    this.router.navigate(['/room'], {queryParams: {name, room}});
  }

}
