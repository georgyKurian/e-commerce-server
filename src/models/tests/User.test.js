import UserModel from '../User';

test('It accepts all params and implements all methods', () => {
  const raw = {
    id: '1234',
    username: 'user1',
    email: 'user1@mysite.com',
    role: 'admin',
  };
  const user = new UserModel(raw);
  expect(user.getData()).toEqual(raw);
});
