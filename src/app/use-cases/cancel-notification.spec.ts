import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/in-memory-notifications-repositoy';
import { CancelNotification } from './cancel-notifications';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification(makeNotification());

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].caceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exisst', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
});
