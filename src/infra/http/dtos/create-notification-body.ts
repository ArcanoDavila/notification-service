import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()  
  category: string;
  
  @IsNotEmpty()    
  content: string;
}
