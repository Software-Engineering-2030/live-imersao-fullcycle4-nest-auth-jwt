import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const users = [
  {
    id: 1,
    username: 'user1@user.com',
    name:'usuario1',
    password: '$2b$10$EecWnvyBtN4ttSJWILAjs.lnOfVejB7ABCxWGLS0OUCEcbcnwTu5K', //123456
    role: 'admin',
  },
  {
    id: 2,
    username: 'user2@user.com',
    name:'Fernando Henrique',
    password: '$2b$10$EecWnvyBtN4ttSJWILAjs.lnOfVejB7ABCxWGLS0OUCEcbcnwTu5K',
    role: 'user',
  },
  {
    id: 3,
    username: 'user3@user.com',
    name:'Luiz Inacio',
    password: '$2b$10$EecWnvyBtN4ttSJWILAjs.lnOfVejB7ABCxWGLS0OUCEcbcnwTu5K',
    role: 'user',
  },
  {
    id: 4,
    username: 'user4@user.com',
    name:'Jair Bolsonaro',
    password: '$2b$10$EecWnvyBtN4ttSJWILAjs.lnOfVejB7ABCxWGLS0OUCEcbcnwTu5K',
    role: 'user',
  },
];
//bcrypt
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = this.validateCredentials(username, password);

    const payload = {
      sub: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  validateCredentials(username: string, password: string) {
    const user = users.find(
      (u) =>
        u.username === username && bcrypt.compareSync(password, u.password),
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
//auth0 - jsonwebtoken