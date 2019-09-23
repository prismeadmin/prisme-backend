const mailgun = require("mailgun-js");
const API_KEY = '46ec0aaa406db6bf193b5cf0e55fdc1c-baa55c84-e1160d64'
const DOMAIN = 'sandbox9b27e8b5ffe348df99a564315758d0bd.mailgun.org';
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

export const sendEmail = (email: String) => {
  const data = {
    from: 'Nazim <me@samples.mailgun.org>',
    to: email,
    subject: 'This is Mailer',
    text: 'Hi form Nazim'
  };
  mg.messages().send(data, function (error: Object, body: Object) {
    console.log(body);
  });
}

