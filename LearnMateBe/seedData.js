const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./src/modal/User');
const Tutor = require('./src/modal/Tutor');

// Sample data
const sampleData = [
  {
    user: {
      username: 'NguyenVanA',
      email: 'nguyenvana@gmail.com',
      password: '123456',
      phoneNumber: '0123456789',
      gender: 'male',
      role: 'tutor',
      image: 'https://via.placeholder.com/150/4A90E2/FFFFFF?text=NV',
      verified: true
    },
    tutor: {
      bio: 'Gia sư Toán học với 8 năm kinh nghiệm, chuyên luyện thi đại học và ôn thi học sinh giỏi.',
      subjects: ['Toán học', 'Vật lý'],
      classes: [10, 11, 12],
      pricePerHour: 200000,
      experience: '8 năm kinh nghiệm giảng dạy',
      education: 'Thạc sĩ Toán học - Đại học Bách Khoa Hà Nội',
      location: 'Hà Nội',
      rating: 4.8,
      languages: ['Tiếng Việt', 'Tiếng Anh'],
      certifications: [
        {
          title: 'Chứng chỉ sư phạm',
          issuedBy: 'Bộ Giáo dục và Đào tạo',
          year: 2018
        }
      ],
      availableTimes: [
        { day: 'Thứ 2', slots: ['19:00-21:00'] },
        { day: 'Thứ 4', slots: ['19:00-21:00'] },
        { day: 'Thứ 6', slots: ['19:00-21:00'] }
      ],
      profileImage: 'https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=Nguyen+Van+A',
      isVerified: true,
      active: true
    }
  },
  {
    user: {
      username: 'TranThiB',
      email: 'tranthib@gmail.com',
      password: '123456',
      phoneNumber: '0987654321',
      gender: 'female',
      role: 'tutor',
      image: 'https://via.placeholder.com/150/E74C3C/FFFFFF?text=TT',
      verified: true
    },
    tutor: {
      bio: 'Gia sư Ngữ Văn chuyên nghiệp, có kinh nghiệm dạy học sinh cấp 2 và cấp 3.',
      subjects: ['Ngữ Văn', 'Lịch sử'],
      classes: [6, 7, 8, 9, 10, 11, 12],
      pricePerHour: 150000,
      experience: '5 năm kinh nghiệm giảng dạy',
      education: 'Cử nhân Ngữ Văn - Đại học Sư phạm Hà Nội',
      location: 'TP. Hồ Chí Minh',
      rating: 4.6,
      languages: ['Tiếng Việt'],
      certifications: [
        {
          title: 'Chứng chỉ sư phạm',
          issuedBy: 'Bộ Giáo dục và Đào tạo',
          year: 2019
        }
      ],
      availableTimes: [
        { day: 'Thứ 3', slots: ['18:00-20:00'] },
        { day: 'Thứ 5', slots: ['18:00-20:00'] },
        { day: 'Thứ 7', slots: ['14:00-16:00'] }
      ],
      profileImage: 'https://via.placeholder.com/300x300/E74C3C/FFFFFF?text=Tran+Thi+B',
      isVerified: true,
      active: true
    }
  }
];

async function seedData() {
  try {
    console.log('🔗 Connecting to database...');
    await mongoose.connect(process.env.DB_HOST || 'mongodb://localhost:27017/learnmate');
    console.log('✅ Connected to database');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await User.deleteMany({ role: 'tutor' });
    await Tutor.deleteMany({});
    console.log('✅ Cleared existing data');

    // Add sample data
    console.log('📥 Adding sample data...');
    for (const data of sampleData) {
      const user = new User(data.user);
      await user.save();
      
      const tutor = new Tutor({
        ...data.tutor,
        user: user._id
      });
      await tutor.save();
      
      console.log(`✅ Added tutor: ${user.username}`);
    }

    console.log('🎉 Sample data added successfully!');
    console.log(`📊 Total tutors: ${sampleData.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run seed
seedData();
