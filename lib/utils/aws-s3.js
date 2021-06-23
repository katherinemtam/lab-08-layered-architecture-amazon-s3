import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const uploadFile = (params) => {

  return s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    
    // console.log(`File uploaded successfully. ${data.Location}`);
  });
};

