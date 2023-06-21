const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

require('dotenv').config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.SES_AccessKey
const secretAccessKey = process.env.SES_SecretAccessKey

const awsConfig = {
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
}

const s3 = new S3Client(awsConfig)

async function uploadImageToS3(imageName, image) {
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: image.buffer,
    ContentType: image.mimetype,
  }
  const command = new PutObjectCommand(params)
  await s3.send(command)
}

async function getImageFromS3(imageName) {
  const params = {
    Bucket: bucketName,
    Key: imageName.photoName,
  }
  const command = new GetObjectCommand(params)
  //generate an url for the photo
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  return url
}

async function deleteImageFromS3(imageName) {
  const params = {
    Bucket: bucketName,
    Key: imageName[0].photoName,
  }
  const command = new DeleteObjectCommand(params)
  await s3.send(command)
}

module.exports = { uploadImageToS3, getImageFromS3, deleteImageFromS3 }
