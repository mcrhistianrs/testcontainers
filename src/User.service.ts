import { Repository } from 'typeorm';
import { User } from './User.entity';

export class UserService {
    constructor(private userRepository: Repository<User>){
    }


    async createUser(firstName: string, lastName: string, age: number):Promise<User>{
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        await this.userRepository.save(user);
        return user
    }
}
