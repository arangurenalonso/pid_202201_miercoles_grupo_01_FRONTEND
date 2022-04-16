import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotifierService) {}

  public notify(type: string, message: string) {
    this.notifier.notify(type, message);
  }
}
