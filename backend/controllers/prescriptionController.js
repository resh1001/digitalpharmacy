const catchAsyncError = require('../middlewares/catchAsyncError');
const Prescription = require('../models/prescriptionModel');
const ErrorHandler = require('../utils/errorHandler');

// Create New Prescription - api/v1/prescription/new
exports.newPrescription = catchAsyncError(async (req, res, next) => {
    const { filename, contentType, data } = req.body;

    const prescription = await Prescription.create({
        filename,
        contentType,
        data,
        uploadedBy: req.user.id // Assuming you have authentication middleware to get the user ID
    });

    res.status(200).json({
        success: true,
        prescription
    });
});

// Get Single Prescription - api/v1/prescription/:id
exports.getSinglePrescription = catchAsyncError(async (req, res, next) => {
    const prescription = await Prescription.findById(req.params.id).populate('uploadedBy', 'name email');
    if (!prescription) {
        return next(new ErrorHandler(`Prescription not found with this id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        prescription
    });
});

// Admin: Get All Prescriptions - api/v1/prescriptions
exports.allPrescriptions = catchAsyncError(async (req, res, next) => {
    const prescriptions = await Prescription.find();

    res.status(200).json({
        success: true,
        prescriptions
    });
});

// Admin: Delete Prescription - api/v1/prescription/:id
exports.deletePrescription = catchAsyncError(async (req, res, next) => {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
        return next(new ErrorHandler(`Prescription not found with this id: ${req.params.id}`, 404));
    }

    await prescription.remove();

    res.status(200).json({
        success: true
    });
});
