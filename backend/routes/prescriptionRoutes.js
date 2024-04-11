const express = require('express');
const router = express.Router();
const { uploadPrescription } = require('../controllers/prescriptionController'); // Assuming you have a controller for prescription handling
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const multer = require('multer');
const path = require('path');

// Set up multer for prescription file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads', 'prescription'));
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

// Route for uploading prescription files
router.post('/upload', isAuthenticatedUser, upload.single('prescription'), uploadPrescription);

module.exports = router;
