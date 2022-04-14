// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/ChacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers except the current provider logged on application', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@gmail.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Japa',
      email: 'japa@gmail.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Lenon',
      email: 'lenon@gmail.com',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });

  it('should be able to list all providers even the current provider logged on application', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@gmail.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Japa',
      email: 'japa@gmail.com',
      password: '123123',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'Lenon',
      email: 'lenon@gmail.com',
      password: '123123',
    });

    const providers = await listProviders.execute({});

    expect(providers).toEqual([user1, user2, user3]);
  });
});
