import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

// Initialize S3 Client with AWS SDK v3
const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

// Configure multer to use multer-s3 with the S3 v3 client
const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `image-${Date.now()}.jpeg`);
      },
      // Do not specify acl here
    }),
  });

// Middleware to handle image upload
const uploadImage = (req, res, next) => {
  const uploadSingle = upload("bazaarlia").single("image");

  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    // `req.file` contains the file information after upload
    res.status(200).json({ path: req.file.location, message: 'Image uploaded!' });
  });
};

export { uploadImage };
