import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  public wordToExpand: string;
  private roomName = this.route.snapshot.queryParamMap.get('room');
  private playerName = this.route.snapshot.queryParamMap.get('name');

  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  async ngOnInit() {
    if (!this.roomName || !this.playerName) {
      console.error('There should be name and room in URL');
      return;
    }
    await this.roomService.connect(this.playerName, this.roomName);
    this.roomService.onExpand().subscribe((response) => {
      this.wordToExpand = response.word;
      console.log(response);
    });
  }

}
