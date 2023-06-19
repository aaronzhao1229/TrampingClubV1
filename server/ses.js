const AWS = require('aws-sdk')

require('dotenv').config()

const awsConfig = {
  accessKeyId: process.env.SES_AccessKey,
  secretAccessKey: process.env.SES_SecretAccessKey,
  region: process.env.AWS_REGION,
}

const SES = new AWS.SES(awsConfig)

const sendEmail = async (info) => {
  const fromEmail = process.env.FROM_EMAIL
  try {
    // prepare email to send
    const params = {
      Source: fromEmail /* required */,
      Destination: {
        /* required */
        ToAddresses: [fromEmail /* more items */],
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
    }

    // send email
    const sendPromise = SES.sendEmail(params).promise()

    sendPromise
      .then((data) => {
        console.log('Email sent successfully', data)
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendEmail
