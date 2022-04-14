import AppError from '@shared/errors/AppError';

import FakeHahsProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeHahsProvider: FakeHahsProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHahsProvider = new FakeHahsProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHahsProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@gmail.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Carlos',
      email: 'carlos@gmail.com',
    });

    expect(updatedUser.name).toBe('Carlos');
    expect(updatedUser.email).toBe('carlos@gmail.com');
  });

  it('should not be able to update the profile with an email already used', async () => {
    await fakeUsersRepository.create({
      name: 'John',
      email: 'john@gmail.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John',
        email: 'john@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the profile password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@gmail.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Carlos',
      email: 'carlos@gmail.com',
      old_password: '123123',
      password: '123456',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it('should not be able to update the profile password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Carlos',
        email: 'carlos@gmail.com',
        old_password: 'blabla',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile from a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'a73f4acd-1c8d-4fb4-a381-79454ea5d966',
        name: 'ab',
        email: 'ab@ab.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
