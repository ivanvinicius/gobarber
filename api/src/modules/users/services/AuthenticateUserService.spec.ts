import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHahsProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHahsProvider;
let authenticateUsers: AuthenticateUserService;

describe('AuthenticateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHahsProvider();

    authenticateUsers = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@client.com',
      password: '123123',
    });

    const response = await authenticateUsers.execute({
      email: 'john@client.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate user with non existing user', async () => {
    await expect(
      authenticateUsers.execute({
        email: 'john@client.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@client.com',
      password: '123123',
    });

    await expect(
      authenticateUsers.execute({
        email: 'john@client.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
