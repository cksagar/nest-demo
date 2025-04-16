import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const normalizedEmail = email.toLowerCase(); // 🔥 normalize email

    // 1️⃣ Check if email is already taken
    const user = await this.userService.findByEmail(normalizedEmail);
    if (user) {
      throw new BadRequestException('Email already in use');
    }
    // 2️⃣ Generate a salt
    const salt = randomBytes(8).toString('hex'); // 16-char salt

    // 3️⃣ Hash the password with scrypt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex'); // store as salt.hash

    // 4️⃣ Save new user with hashed password
    const newUser = await this.userService.create(email, result);

    return newUser;
  }

  async signin(email: string, password: string) {
    // get the user with email
    const normalizedEmail = email.toLowerCase(); // 🔥 normalize email
    const user = await this.userService.findByEmail(normalizedEmail);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }
}
