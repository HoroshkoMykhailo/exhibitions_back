import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
      ) {}

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findByUsername(username: string): Promise<User | undefined> {
        const user = this.usersRepository.findOne({ where: { username } });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        return user;
    }

    async findById(id: number): Promise<User | undefined> {
        const user = this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        return user;
    }

    async create(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const existingUser = await this.usersRepository.findOne({ where: { username } });

        if (existingUser) {
          throw new BadRequestException('User with this username already exists');
        }
    
        const user = this.usersRepository.create({ username, password: hashedPassword });

        return this.usersRepository.save(user);
      }
}
