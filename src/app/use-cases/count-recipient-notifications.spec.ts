import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/in-memory-notifications-repositoy';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}));
    await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}));
    await notificationsRepository.create(makeNotification({recipientId: 'recipient-2'}));
    await notificationsRepository.create(makeNotification({recipientId: 'recipient-2'}));
    await notificationsRepository.create(makeNotification({recipientId: 'recipient-3'}));
    
    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2)
  });
});
