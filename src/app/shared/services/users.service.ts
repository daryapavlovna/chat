import { Injectable } from '@angular/core';
import { User } from '../classes/user.model';
import { BehaviorSubject, Subject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor() { }

  public setCurrentUser(newUser: User): void {
    const {name, avatarSrc} = newUser;
    this.currentUser.next(new User(name, avatarSrc));
  }
}

export const userServiceInjectables: Array<any> = [
  UsersService
];
