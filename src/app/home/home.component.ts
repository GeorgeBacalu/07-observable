import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  customIntervalSubscription: Subscription;

  ngOnInit(): void {
    const customInterval = Observable.create((observer: Observer<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(++count);
        if(count === 4) observer.complete();
        if(count > 4) observer.error(new Error('Count is greater than 3!'));
      }, 1000);
    });
    this.customIntervalSubscription = customInterval
      .pipe(filter((count: number) => count > 1),
            map((count: number) => "Round: " + count))
      .subscribe((count: number) => console.log(count),
                 (error: Error) => { console.log(error); alert(error.message); },
                 () => console.log("Completed!"));
  }

  ngOnDestroy(): void { this.customIntervalSubscription.unsubscribe(); }
}
