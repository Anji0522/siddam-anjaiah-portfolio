const Education = require('../models/Education');
const seedData = require('../services/seedData');

// @desc    Get all education records
// @route   GET /api/education
// @access  Public
const getEducation = async (req, res, next) => {
  try {
    let edu = await Education.find().sort({ order: 1 });

    if (!edu || edu.length === 0) {
      edu = seedData.education;
    }

    res.status(200).json({
      success: true,
      count: edu.length,
      data: edu
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new education record
// @route   POST /api/education
// @access  Private (Admin)
const createEducation = async (req, res, next) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Education record created successfully',
      data: edu
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update education record
// @route   PUT /api/education/:id
// @access  Private (Admin)
const updateEducation = async (req, res, next) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!edu) {
      return res.status(404).json({
        success: false,
        message: 'Education record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Education record updated successfully',
      data: edu
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete education record
// @route   DELETE /api/education/:id
// @access  Private (Admin)
const deleteEducation = async (req, res, next) => {
  try {
    const edu = await Education.findByIdAndDelete(req.params.id);

    if (!edu) {
      return res.status(404).json({
        success: false,
        message: 'Education record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Education record deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation
};
