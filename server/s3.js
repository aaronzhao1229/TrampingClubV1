const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3')

const {
  CloudFrontClient,
  CreateInvalidationCommand,
} = require('@aws-sdk/client-cloudfront')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

require('dotenv').config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.SES_AccessKey
const secretAccessKey = process.env.SES_SecretAccessKey
const cloudFrontDistId = process.env.DISTRIBUTION_ID

const awsConfig = {
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
}

const cloudFront = new CloudFrontClient({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
})

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
  // const params = {
  //   Bucket: bucketName,
  //   Key: imageName.photoName,
  // }
  // const command = new GetObjectCommand(params)
  //generate an url for the photo

  // const url = await getSignedUrl(s3, command, { expiresIn: 3600 })

  // get the url from AWS CloudFront
  const url = 'https://d3jq5i663pfl88.cloudfront.net/' + imageName.photoName
  return url
}

async function deleteImageFromS3(imageName) {
  // delete image from s3
  const params = {
    Bucket: bucketName,
    Key: imageName,
  }
  const command = new DeleteObjectCommand(params)
  await s3.send(command)
  // Invalidate the cloudFront cache for that image

  const invalidateParams = {
    DistributionId: cloudFrontDistId,
    InvalidationBatch: {
      CallerReference: imageName, // this is a unique string that will identify the request that is being made. If this is the same as last time, cloudFront would not do it twice.
      Paths: {
        Quantity: 1,
        Items: ['/' + imageName],
      },
    },
  }
  const invalidationCommand = new CreateInvalidationCommand(invalidateParams)
  await cloudFront.send(invalidationCommand)
}

module.exports = { uploadImageToS3, getImageFromS3, deleteImageFromS3 }
