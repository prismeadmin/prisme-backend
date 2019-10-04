const axios = require('axios');

export async function keepSubscribers(email: string) {
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
    url: 'https://us20.api.mailchimp.com/3.0/lists/b0404295b1',
    method: 'POST',
    headers: {
      Authorization: 'auth 71634e399a09a918610fd25094e6731c-us20'
    },
    data: postData
  }

  return new Promise((resolve, reject) => {
    axios(options, async (error: string, response: { statusCode: number }) => {
      try {
        if (response.statusCode === 200) {
          return resolve(true)
        } else {
          return error
        }
      } catch (err) {
        reject(err)
      }
    })
  })
}

