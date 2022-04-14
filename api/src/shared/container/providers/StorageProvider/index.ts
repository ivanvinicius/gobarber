import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const storage = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storage[uploadConfig.driver],
);
