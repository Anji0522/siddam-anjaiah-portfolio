const Certification = require('../models/Certification');
const seedData = require('../services/seedData');

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
const getCertifications = async (req, res, next) => {
  try {
    let certs = await Certification.find().sort({ order: 1 });

    if (!certs || certs.length === 0) {
      certs = seedData.certifications;
    }

    res.status(200).json({
      success: true,
      count: certs.length,
      data: certs
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new certification
// @route   POST /api/certifications
// @access  Private (Admin)
const createCertification = async (req, res, next) => {
  try {
    const cert = await Certification.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Certification created successfully',
      data: cert
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private (Admin)
const updateCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Certification updated successfully',
      data: cert
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private (Admin)
const deleteCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);

    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification
};
