import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
    create(username: string, password: string): Promise<User>;
}
