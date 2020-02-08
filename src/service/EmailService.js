class EmailService {
  constructor() {
    this.enabled = true;
  }

  sendEmail(user, token) {
    if (this.enabled) {
      console.log(
        `[Email Service.sendEmail] To login as ${user.email} go to : http://localhost:3000/auth/${token}`,
      );
    }
  }
}

const EmailServiceSingleton = new EmailService();

export default EmailServiceSingleton;
