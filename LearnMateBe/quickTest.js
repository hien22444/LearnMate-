const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./src/modal/User');
const Tutor = require('./src/modal/Tutor');

async function quickTest() {
  try {
    console.log('🔍 QUICK SYSTEM TEST');
    console.log('═'.repeat(40));
    
    // Test 1: Database connection
    console.log('1️⃣ Testing database connection...');
    await mongoose.connect(process.env.DB_HOST || 'mongodb+srv://SDN392:23f5SeJ9KZyFY5ny@sdn392.oozdntu.mongodb.net/SDN392Mongo?retryWrites=true&w=majority&appName=SDN392');
    console.log('✅ Database connected successfully');
    
    // Test 2: Check data
    console.log('\n2️⃣ Checking data...');
    const userCount = await User.countDocuments({ role: 'tutor' });
    const tutorCount = await Tutor.countDocuments();
    console.log(`✅ Users (tutor): ${userCount}`);
    console.log(`✅ Tutors: ${tutorCount}`);
    
    // Test 3: Sample data
    if (tutorCount > 0) {
      const sampleTutor = await Tutor.findOne({}).populate('user', 'username email');
      console.log(`✅ Sample tutor: ${sampleTutor?.user?.username || 'N/A'}`);
    }
    
    console.log('\n🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

quickTest();
