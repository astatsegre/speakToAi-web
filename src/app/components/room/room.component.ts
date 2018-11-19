import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {IExpand, IGuess} from '../../interfaces/expand.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  public currentStage: number;
  public wordToExpand: string;
  public examples: IExpand['examples'];
  public sentenceToGuess: string[];
  public selectWordStart: number;
  public selectWordEnd: number;
  public selectedWordsIndexes = {};
  private $onExpand: Subscription;
  private $onGuess: Subscription;
  private roomName = this.route.snapshot.queryParamMap.get('room');
  private playerName = this.route.snapshot.queryParamMap.get('name');

  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  async ngOnInit() {
    if (!this.roomName || !this.playerName) {
      console.error('There should be name and room in URL');
      return;
    }
    await this.roomService.connect(this.playerName, this.roomName);
    this.$onExpand = this.roomService.onExpand().subscribe((response: IExpand) => {
      this.currentStage = 0;
      this.wordToExpand = response.word;
      this.examples = response.examples;
    });
    this.roomService.onGuess().subscribe((response: IGuess) => {
      this.currentStage = 1;
      this.sentenceToGuess = response.toGuess;
    });
  }
  ngOnDestroy() {
    this.$onExpand.unsubscribe();
    this.$onGuess.unsubscribe();
  }
  public expand(expandInput: HTMLInputElement) {
    this.roomService.sendExpand(expandInput.value);
  }
  public selectWord(index: number): void {
    if (this.selectWordStart === undefined) {
      this.selectWordStart = index;
      this.selectedWordsIndexes[index] = true;
    } else if (this.selectWordStart !== undefined && this.selectWordEnd === undefined) {
      this.selectWordEnd = index;
      for (let i = this.selectWordStart; i <= this.selectWordEnd; i++) {
        this.selectedWordsIndexes[i] = true;
      }
    } else if (this.selectWordStart !== undefined && this.selectWordEnd !== undefined) {
      this.selectWordStart = index;
      this.selectWordEnd = undefined;
      for (let i = 0; i < this.sentenceToGuess.length; i++) {
        this.selectedWordsIndexes[i] = false;
      }
      this.selectedWordsIndexes[index] = true;
    }
  }
  public guess(): void {
    let arrayOfWordIndexes: number[] = [];
    if (this.selectWordStart !== undefined && this.selectWordEnd !== undefined) {
      for (let i = this.selectWordStart; i <= this.selectWordEnd; i++) {
        arrayOfWordIndexes.push(i);
      }
    }
    if (this.selectWordStart !== undefined && this.selectWordEnd === undefined) {
      arrayOfWordIndexes = [this.selectWordStart];
    }
    if (this.selectWordStart === undefined && this.selectWordEnd === undefined) {return; }
    this.roomService.sendGuess(arrayOfWordIndexes);
  }
}
