/* eslint no-unused-vars: 0 */

class AuthService {

  constructor(Restangular) {
    this.AuthApi = Restangular.one('auth');
  }

  signup(user) {
    return this.AuthApi.post('register', user);
  }

  signin(user) {
    return this.AuthApi.post('login', user);
  }

  changePassword(password) {
    const data = {
      actualPassword: password.old,
      password: password.new,
      confirmPassword: password.confirm
    };
    return this.AuthApi
      .post('changepassword', data);
  }

  forgotPassword(username) {
    return this.AuthApi
      .post('forgotpassword', {username});
  }

  activationRequest(username) {
    return this.AuthApi.post('token', {username});
  }

  activate(token) {
    return this.AuthApi
      .post('activate', { token });
  }

  reset(data) {
    return this.AuthApi
      .post('resetpassword', data);
  }

}

