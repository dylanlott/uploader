UPLOADER
========

> a super simple single-file slick S3-compatible uploader.


# .env file
You need to create a `.env` in the root of your project. If you don't, the app won't start up.

It should have the following fields

```
AWS_ACCESS_KEY=youraccesskey
AWS_SECRET_KEY=yoursecretkey
BASE_ENDPOINT_URL=amazon_base_url
UPLOADER_PORT=3000
BUCKET=yourbucketname
```

The BASE_ENDPOINT_URL should be the base URL of your amazon S3 service. It's everything except for the bucket name, which is set by the BUCKET env variable.

# Docker

You can build the docker image for this by running 

`docker build -t uploader ./`

If you want to run the docker image

`docker run -p <host_port>:<container_port> -f ./uploader`

# PM2

This repo contains a process.yml file which can be used to control how PM2 handles this process.
If you want to use PM2 to run this, you can simply run

`pm2 start index`

in the root and it should start up. 
