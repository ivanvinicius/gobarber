import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';

import RedisCacheProvider from './implementations/RedisCacheProvider';

const cache = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', cache.redis);
