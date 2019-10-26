const mailgun = require("mailgun-js");
const API_KEY = 'e70a1e1c2b6ac04c9ee8ace22b5c6b00-dc5f81da-f68ac6ab';
const DOMAIN = 'sandbox7b042ed37d9d4611a4a11ad41d905ec1.mailgun.org';
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

export const sendEmail = (email: String, secretToken: String) => {
  const data = {
    from: 'Nazim <me@samples.mailgun.org>',
    to: email,
    subject: 'Verification code',
    text: `Please verify your account with password: ${secretToken}`
  };
  mg.messages().send(data, function (error: Object, body: Object) {
    console.log(body);
  });
}

