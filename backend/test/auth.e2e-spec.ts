import { HttpStatus} from '@nestjs/common';
import { exception } from 'console';
import 'dotenv/config';
import { RedisRepositoryService } from 'src/services/redisRepository.service';
import * as request from 'supertest';

let app = 'http://localhost:3000';

beforeAll(async() => {
    await RedisRepositoryService.connect(process.env.REDIS_PORT || 6379);
})

describe('AUTH', () => 
{
    const user: RegisterDTO = {
        username: 'username',
        password: 'password',
    };

    it('should register user', () => 
    {
        const user: RegisterDTO = 
        {
            username: 'username',
            password: 'password',
        }

return request(app)
    .post('/auth/')
    .set('Accept', 'application/json')
    .send(user)
    .expect(({ body }) => {
        expect(body.token).toBeDefined();
    })
    .expect(HttpStatus.CREATED);

});