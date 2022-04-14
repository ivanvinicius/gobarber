import AppError from '@shared/errors/AppError';
import FakeHahsProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/ChacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHahsProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUsers: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHahsProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUsers = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const users = await createUsers.execute({
      name: 'John Doe',
      email: 'john@client.com',
      password: '123123',
    });

    expect(users).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email', async () => {
    await createUsers.execute({
      name: 'John Doe',
      email: 'john@client.com',
      password: '123123',
    });

    await expect(
      createUsers.execute({
        name: 'John Doe',
        email: 'john@client.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
