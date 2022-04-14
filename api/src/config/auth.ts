interface IJwtProps {
  secret: string;
  expiresIn: string | number;
}

// const isProduction = process.env.NODE_ENV === 'production';

// secret: isProduction ? process.env.APP_SECRET : 'secret',
// expiresIn: isProduction ? process.env.EXPIRES_IN : '2d',

export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: process.env.EXPIRES_IN || '1d',
  } as IJwtProps,
};
