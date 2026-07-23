import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  // Component-level Providers (Exercise 6 Task 2)
  // Explanation: Providing the service here creates a new instance of NotificationService
  // scoped to this component instance and its children. Unlike singleton root-level providers,
  // multiple NotificationComponent instances will have completely isolated states.
  providers: [NotificationService],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent implements OnInit {
  notifications: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.addNotification('System initialization completed.');
    this.refreshList();
  }

  triggerAlert(): void {
    this.notificationService.addNotification('New registration request detected.');
    this.refreshList();
  }

  private refreshList(): void {
    this.notifications = this.notificationService.getNotifications();
  }
}
