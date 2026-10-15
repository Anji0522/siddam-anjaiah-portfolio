const Project = require('../models/Project');
const seedData = require('../services/seedData');

// @desc    Get all projects with optional filtering/search
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const { category, search, featured, sort } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    let sortOption = { order: 1, createdAt: -1 };
    if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'alphabetical') {
      sortOption = { title: 1 };
    }

    let projects = await Project.find(query).sort(sortOption);

    // Fallback to seedData if collection is empty
    if ((!projects || projects.length === 0) && !search && !category) {
      projects = seedData.projects;
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single project by ID or slug
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let project = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(id);
    }

    if (!project) {
      project = await Project.findOne({ slug: id.toLowerCase() });
    }

    // Fallback to seedData if DB not yet seeded
    if (!project) {
      project = seedData.projects.find(
        (p) => p.slug === id.toLowerCase() || p.title.toLowerCase() === id.toLowerCase()
      );
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with identifier '${id}' not found`
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res, next) => {
  try {
    if (!req.body.slug && req.body.title) {
      req.body.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    let project = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
    } else {
      project = await Project.findOneAndUpdate({ slug: id.toLowerCase() }, req.body, {
        new: true,
        runValidators: true
      });
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    let project = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findByIdAndDelete(id);
    } else {
      project = await Project.findOneAndDelete({ slug: id.toLowerCase() });
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
