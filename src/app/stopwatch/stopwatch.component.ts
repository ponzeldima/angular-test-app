import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html'
})
  
export class StopwatchComponent{

  stopwatchStatus: StopwatchStatus = StopwatchStatus.Stoped;
  stopStartButtonTitle = 'Start';
  private seconds = 0;
  timerSubsription: any;
  waitButtonClicked: boolean;

  get Seconds(): number {
    return this.seconds;
  }
  set Seconds(value: number) {
      this.seconds = value;
  }



  private startTimer() {
    let observableTimer = timer(0, 1000);
    this.timerSubsription = observableTimer.subscribe(val => {
      //console.log(this.Seconds);
      this.Seconds += 1;
    });
  }

  private stopTimer() {
    if(this.timerSubsription)
      this.timerSubsription.unsubscribe();
    this.Seconds = 0;
  }

  private pauseTimer() {
    if(this.timerSubsription)
      this.timerSubsription.unsubscribe();
  }

  stopStart() {
    if (this.stopwatchStatus == StopwatchStatus.Stoped
        || this.stopwatchStatus == StopwatchStatus.Paused) {
      this.stopwatchStatus = StopwatchStatus.Started;
      this.stopStartButtonTitle = 'Stop';
      this.startTimer();
    }
    else {
      this.stopwatchStatus = StopwatchStatus.Stoped;
      this.stopStartButtonTitle = 'Start';
      this.stopTimer();
    }
  }

  wait() {
    if (this.stopwatchStatus == StopwatchStatus.Started) {
      if (this.waitButtonClicked) {
        this.pauseTimer();
        this.stopwatchStatus = StopwatchStatus.Paused;
        this.stopStartButtonTitle = 'Start';
      }
      else {
        this.waitButtonClicked = true;
        console.log(true);
        setTimeout(() => {
          this.waitButtonClicked = false;
          console.log(false);
        }, 300);
      }
    }
  }

  reset() {
    this.stopTimer();
    this.startTimer();
    this.stopwatchStatus = StopwatchStatus.Started;
    this.stopStartButtonTitle = 'Stop';
  }

}

enum StopwatchStatus {
  Started,
  Paused,
  Stoped
}
