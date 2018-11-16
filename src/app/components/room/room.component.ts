import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {IExpand} from '../../interfaces/expand.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  public wordToExpand: string;
  public examples: IExpand['examples'];
  private roomName = this.route.snapshot.queryParamMap.get('room');
  private playerName = this.route.snapshot.queryParamMap.get('name');

  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  async ngOnInit() {
    if (!this.roomName || !this.playerName) {
      console.error('There should be name and room in URL');
      return;
    }
    await this.roomService.connect(this.playerName, this.roomName);
    this.roomService.onExpand().subscribe((response: IExpand) => {
      this.wordToExpand = response.word;
      this.examples = response.examples;
      response.examples.forEach((e) => {
        console.log(1111, this.roomService.renderExpandSentence(e)); // rendering examples. See utils.js for details
      });
    });
  }
  public expand(expandInput: HTMLInputElement) {
    this.roomService.sendExpand(expandInput.value);
  }

}
