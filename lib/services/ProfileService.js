import Profile from '../models/Profile.js';
import { uploadFile } from '../utils/aws-s3.js';
import dotenv from 'dotenv';

dotenv.config();

const params = {
  Bucket: process.env.S3_BUCKET_NAME,
  Key: 'Hello!',
  Body: 'This is a message.'
};

export default class ProfileService {
  
  static async create({ email, accountId }){
    const profile = await Profile.insert({ email, accountId });
    await uploadFile(params);

    return profile;
  }
}
