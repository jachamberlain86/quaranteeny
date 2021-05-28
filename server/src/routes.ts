import { UserController } from './controller/UserController';

export const Routes = [
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'put',
    route: '/users',
    controller: UserController,
    action: 'update',
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save',
  },
];
