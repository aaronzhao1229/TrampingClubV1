const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses')

require('dotenv').config()

const awsConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.SES_AccessKey,
    secretAccessKey: process.env.SES_SecretAccessKey,
  },
}

const ses = new SESClient(awsConfig)

// prepare email to send
const createSendEmailCommand = (toAddress, info) => {
  return new SendEmailCommand({
    Source: toAddress /* required */,
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [toAddress /* more items */],
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: `An email from Lambda website`,
      },
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: `<h3>Hi, you have received an email from Lambda websit</h3><br/><p>From: ${info.name}
              </p><br/>
              <p>Email Address: ${info.email}
              </p><br/>
              <p>Message: ${info.message}</p>`,
        },
        // Text: {
        //   Charset: 'UTF-8',
        //   Data: `Hi Text`,
        // },
      },
    },

    ReplyToAddresses: [info.email /* more items */],
  })
}

const sendEmail = async (info) => {
  const toAdress = process.env.FROM_EMAIL
  const sendEmailCommand = createSendEmailCommand(toAdress, info)
  try {
    return await ses.send(sendEmailCommand)
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendEmail
