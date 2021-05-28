import { getRepository } from 'typeorm';
import { Request } from 'express';
import { User } from '../entity/User';

export class UserController {
  private userRepository = getRepository(User);

  async one(request: Request): Promise<User> {
    return this.userRepository.findOne(request.params.id);
  }

  async update(request: Request): Promise<User> {
    return this.userRepository.save(request.body);
  }

  async save(request: Request): Promise<User> {
    return this.userRepository.save(request.body);
  }
}
