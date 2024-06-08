import { DataSource } from "typeorm";
import { User } from './User.entity';


test('create user', async() =>{
    const dataSource = new DataSource({
        type: 'mysql',
        host: '',
        port: 0,
        username: '',
        password: '',
        synchronize: true,
        database: 'test',
        entities: [User],
        logging: true
    });
    await dataSource.initialize();
})