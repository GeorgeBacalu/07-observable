import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  activated: boolean = false;
  userActivatedSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void { this.userActivatedSubscription = this.userService.userActivated.subscribe((activated: boolean) => this.activated = activated); }

  ngOnDestroy(): void { this.userActivatedSubscription.unsubscribe(); }
}
