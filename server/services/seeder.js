require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certification = require('../models/Certification');
const Education = require('../models/Education');
const AdminUser = require('../models/AdminUser');
const seedData = require('./seedData');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding process...');

    // 1. Seed or Update Profile
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      await Profile.create(seedData.profile);
      console.log('✅ Profile seeded.');
    } else {
      await Profile.findByIdAndUpdate(existingProfile._id, seedData.profile, { new: true });
      console.log('ℹ️ Profile updated to latest verified state.');
    }

    // 2. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(seedData.projects);
      console.log(`✅ ${seedData.projects.length} Projects seeded.`);
    } else {
      // Sync each project so details stay up to date
      for (const proj of seedData.projects) {
        await Project.findOneAndUpdate({ slug: proj.slug }, proj, { upsert: true, new: true });
      }
      console.log('ℹ️ Projects synced.');
    }

    // 3. Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(seedData.skills);
      console.log(`✅ ${seedData.skills.length} Skills seeded.`);
    } else {
      for (const skill of seedData.skills) {
        await Skill.findOneAndUpdate({ name: skill.name }, skill, { upsert: true, new: true });
      }
      console.log('ℹ️ Skills synced.');
    }

    // 4. Seed Certifications
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      await Certification.insertMany(seedData.certifications);
      console.log(`✅ ${seedData.certifications.length} Certifications seeded.`);
    } else {
      for (const cert of seedData.certifications) {
        await Certification.findOneAndUpdate({ title: cert.title }, cert, { upsert: true, new: true });
      }
      console.log('ℹ️ Certifications synced.');
    }

    // 5. Seed Education
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      await Education.insertMany(seedData.education);
      console.log(`✅ ${seedData.education.length} Education items seeded.`);
    } else {
      for (const edu of seedData.education) {
        await Education.findOneAndUpdate({ qualification: edu.qualification }, edu, { upsert: true, new: true });
      }
      console.log('ℹ️ Education items synced.');
    }

    // 6. Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'anjisiddam01@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecurePassword@2026';
    
    const existingAdmin = await AdminUser.findOne({ email: adminEmail.toLowerCase() });
    if (!existingAdmin) {
      await AdminUser.create({
        email: adminEmail.toLowerCase(),
        password: adminPassword,
        role: 'admin'
      });
      console.log(`✅ Default admin account created for: ${adminEmail}`);
    } else {
      console.log(`ℹ️ Admin account already exists: ${adminEmail}`);
    }

    console.log('🎉 Database seeding complete!');
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
  }
};

// If run directly via node seeder.js
if (require.main === module) {
  const { connectDB, disconnectDB } = require('../config/db');
  connectDB().then(async (conn) => {
    if (conn) {
      await seedDatabase();
      await disconnectDB();
      process.exit(0);
    } else {
      console.error('Could not connect to database for seeding.');
      process.exit(1);
    }
  });
}

module.exports = seedDatabase;
