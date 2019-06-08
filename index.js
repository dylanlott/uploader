require('dotenv').config()
const pkg = require('./package.json')
const slug = require('slug')
const express = require('express')
const app = express()
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const multer = require('multer')
const endpoint = new aws.Endpoint('s3.wasabisys.com')
const parsePath = require('parse-filepath')

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  endpoint: endpoint
})

const storage = multerS3({
  s3,
  bucket: process.env.BUCKET,
  acl: 'public-read',
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname })
  },
  key: (req, file, cb) => {
    req.filename = parsePath(file.originalname).basename
    cb(null, req.filename)
  }
})

app.get('/', (req, res, next) => {
  return res.json({
    version: pkg.version,
    status: 'OK',
    code: 200,
    message: 'bandforge uploader'
  })
})

app.post('/', (req, res, next) => {
  const upload = multer({ storage }).single('image');

  upload(req, res, (err) => {
    if (err) return res.status(500).send(err)
    const url = `https://s3.wasabisys.com/${process.env.BUCKET}/`
    return res.json({
      filename: req.filename,
      url: `${url}${req.filename}`
    })
  })
})

app.listen(process.env.UPLOADER_PORT, () => {
  console.log(`
    ********
    UPLOADER LISTENING ON PORT ${process.env.UPLOADER_PORT}
    ********
  `)
})
