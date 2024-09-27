const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const s3 = require("../config/s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("paymentSS"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Payment screenshot is required." });
    }

    const {
      name,
      email,
      phone,
      registrationNumber,
      transactionNumber,
      referralId,
    } = req.body;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `payment-screenshots/${uuidv4()}_${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const uploadResult = await s3.send(new PutObjectCommand(params));

    const paymentScreenshotUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

    const newRegistration = new Registration({
      name,
      email,
      phone,
      registrationNumber,
      transactionNumber,
      referralId: referralId || null,
      paymentSS: paymentScreenshotUrl,
    });

    await newRegistration.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
