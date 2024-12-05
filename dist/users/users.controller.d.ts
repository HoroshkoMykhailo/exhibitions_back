import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(id?: number, username?: string): Promise<User | User[]>;
    register(createUserDto: CreateUserDto): Promise<User>;
    getMyProfile(req: any): Promise<User>;
}
