import { UserData } from './../api/user-data';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './users/user';

export class AppData implements InMemoryDbService {
  createDb(): any {
    const users: User[] = UserData.users;
    return { users };
  }
}
