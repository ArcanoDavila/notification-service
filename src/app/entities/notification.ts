import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/Replace';
import { Content } from './content';

export interface NotificationProps {
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
  recipientId: string;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      content: props.content,
      category: props.category,
      readAt: props.readAt,
      canceledAt: props.canceledAt,
      recipientId: props.recipientId,
      createdAt: props.createdAt ?? new Date(),
    };
  }
  public get id() {
    return this._id;
  }
  public set category(category: string) {
    this.props.category = category;
  }
  public get category(): string {
    return this.props.category;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }
  public uncancel() {
    this.props.canceledAt = null;
  }
  public read() {
    this.props.readAt = new Date();
  }
  public unread() {
    this.props.readAt = null;
  }
  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public set recipientID(recipientId: string) {
    this.props.recipientId = recipientId;
  }
  public get recipientId(): string {
    return this.props.recipientId;
  }
}
