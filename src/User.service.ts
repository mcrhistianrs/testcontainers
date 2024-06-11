import { DeleteResult, Repository } from 'typeorm';
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

    async deleteUser(id: number):Promise<boolean | undefined>{
        const deleteResult: DeleteResult = await this.userRepository.delete(id);
        // Check if any rows were affected by the deletion
        return deleteResult.affected > 0? true : undefined;
    }
}
