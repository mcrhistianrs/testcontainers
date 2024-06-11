import { MySqlContainer } from "@testcontainers/mysql";
import { DataSource } from "typeorm";
import { User } from './User.entity';
import { UserService } from "./User.service";


describe('User service', () => {
    let mysqlContainer;

    beforeAll(async () => {
         mysqlContainer = await new MySqlContainer()
        .withCommand(["--default-authentication-plugin=mysql_native_password"])
        .withReuse()
        .start();
    },10000);

    afterAll(async () => {
        await mysqlContainer.stop();
    });

    test('create user', async() =>{
        
        const dataSource = new DataSource({
            type: 'mysql',
            host: mysqlContainer.getHost(),
            port: mysqlContainer.getMappedPort(3306),
            username: 'test',
            password: 'test',
            synchronize: true,
            database: 'test',
            entities: [User],
            logging: true
        });
        await dataSource.initialize();
        const userService = new UserService(dataSource.getRepository(User));
        const user = await userService.createUser('John', 'Doe', 30);
        await dataSource.destroy();
        expect(user).toEqual({
            id: expect.any(Number),
            firstName: 'John',
            lastName: 'Doe',
            age: 30
        });
        
    },20000)

    test('delete  user', async() =>{
        
        const dataSource = new DataSource({
            type: 'mysql',
            host: mysqlContainer.getHost(),
            port: mysqlContainer.getMappedPort(3306),
            username: mysqlContainer.getUsername(),
            password: mysqlContainer.getUserPassword(),
            synchronize: true,
            database: mysqlContainer.getDatabase(),
            entities: [User],
            logging: true
        });
        await dataSource.initialize();
        const userService = new UserService(dataSource.getRepository(User));
        const user = await userService.createUser('John', 'Doe', 30);
        const resultOfDeleteUser = await userService.deleteUser(user.id);
        await dataSource.destroy();
        expect(resultOfDeleteUser).toBe(true);
        
    },20000)
} )


