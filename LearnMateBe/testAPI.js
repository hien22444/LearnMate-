const axios = require('axios');

async function testAPI() {
  const baseURL = 'https://learnmate-rust.vercel.app';
  
  console.log('🧪 TESTING LEARNMATE API');
  console.log('═'.repeat(50));
  
  try {
    // Test 1: Health check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await axios.get(`${baseURL}/`);
    console.log('✅ Health check:', healthResponse.data);
    
    // Test 2: Get tutors
    console.log('\n2️⃣ Testing tutors API...');
    const tutorsResponse = await axios.get(`${baseURL}/tutors`);
    console.log('✅ Tutors API:', {
      status: tutorsResponse.status,
      count: tutorsResponse.data?.tutors?.length || 0,
      firstTutor: tutorsResponse.data?.tutors?.[0]?.user?.username || 'No tutors'
    });
    
    // Test 3: Test community endpoint
    console.log('\n3️⃣ Testing community endpoint...');
    try {
      const communityResponse = await axios.get(`${baseURL}/community`);
      console.log('✅ Community API:', communityResponse.data);
    } catch (error) {
      console.log('❌ Community API error:', error.response?.status, error.response?.statusText);
    }
    
    console.log('\n🎉 API Testing completed!');
    
  } catch (error) {
    console.error('❌ API Test failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Chạy test
testAPI();
