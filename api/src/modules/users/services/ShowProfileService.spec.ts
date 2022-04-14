import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@gmail.com',
      password: '123123',
    });

    const userShown = await showProfile.execute({
      user_id: user.id,
    });

    expect(userShown).toHaveProperty('name');
    expect(userShown).toHaveProperty('email');
  });

  it('should not be able to show profile from a non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'a73f4acd-1c8d-4fb4-a381-79454ea5d966',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
