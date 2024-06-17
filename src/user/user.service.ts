import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['address'] });
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  async updateUser(id: string, updateUserDto: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
