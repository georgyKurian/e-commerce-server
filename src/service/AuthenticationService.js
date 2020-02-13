import jwt from 'jsonwebtoken';

class AuthenticaionService {
  static async generate(user) {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // expires in 1 week
        data: user,
      },
      process.env.JWT_SECRET,
    );
  }
}

// const AuthenticaionServiceSingleton = new AuthenticaionService();

export default AuthenticaionService;
