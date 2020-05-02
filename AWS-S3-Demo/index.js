const fs = require('fs')
const config = require('./config')
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
})

const fileName = 'ThongNguyen_March25.pdf'

const uploadFile = () => {
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: 'restaskestpayroll', // Bucket name
            Key: 'ThongNguyen_March25.pdf', // File will be saved as BUCKET_NAME/names.json
            Body: data
        };
        s3.upload(params, function(s3Err, data) {
            if(s3Err) throw s3Err;
            console.log(`File uploaded successfully at ${data.Location}`)
        })
    })
}

uploadFile();