const axios = require('axios');

export function keepSubscribers(email: string) {
  const data = {
    members: [
      {
        // eslint-disable-next-line @typescript-eslint/camelcase
        email_address: email,
        status: 'subscribed'
      }
    ]
  }
  const postData = JSON.stringify(data)

  const options = {
    url: 'https://us20.api.mailchimp.com/3.0/lists/3b14df5586',
    method: 'POST',
    headers: {
      Authorization: 'auth 6c72d6ec0019e656b7d434b886767b27-us3'
    },
    data: postData
  }


  axios(options).then(function (response: object) {
    console.log(response);
  })
    .catch(function (error: object) {
      console.log(error);
    });
}

