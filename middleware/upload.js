const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");

    
let s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIASZQHDWA5BE3362GN',
    secretAccessKey: '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',
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'teamrocket',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(
        null,
        Date.now().toString() +
          path.parse(file.originalname).name +
          path.extname(file.originalname)
      );
    },
  }),
});

module.exports = upload