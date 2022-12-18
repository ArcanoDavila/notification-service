import { Notification } from '../src/app/entities/notification';
import { NotificationsRepository } from '../src/app/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notificaton) => notificaton.recipientId === recipientId,
    );
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notificaton) => notificaton.recipientId === recipientId,
    ).length;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificatioIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificatioIndex >= 0) {
      this.notifications[notificatioIndex] = notification;
    }
  }

  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
