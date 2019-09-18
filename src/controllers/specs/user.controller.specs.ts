export const CredentialsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      minLength: 8
    }
  }

}

export const CreadentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema }
  }
}

export const ResponseType = {
  responses: {
    '200': {
      'description': 'Token',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              token: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
}
