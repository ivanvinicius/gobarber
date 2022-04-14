import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

let fakeStorageProvider: FakeStorageProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update an user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'as',
      email: 'as@a.com',
      password: '123123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'a.jpg',
    });

    expect(user.avatar).toBe('a.jpg');
  });

  it('should not be able to update avatar from a non-existent user ', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existent user',
        avatarFileName: 'a.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an old avatar from a user when this one is updating ', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'as',
      email: 'as@a.com',
      password: '123123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'a.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'a2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('a.jpg');
    expect(user.avatar).toBe('a2.jpg');
  });
});
