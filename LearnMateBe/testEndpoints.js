const axios = require('axios');

async function testEndpoints() {
  const baseURL = 'https://learnmate-rust.vercel.app';
  
  console.log('🧪 TESTING API ENDPOINTS');
  console.log('═'.repeat(50));
  
  const endpoints = [
    { name: 'Health Check', url: '/' },
    { name: 'Tutors API', url: '/tutors' },
    { name: 'Community API', url: '/community' },
    { name: 'Login API', url: '/login' },
    { name: 'Register API', url: '/register' }
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`\n🔍 Testing ${endpoint.name}...`);
      const response = await axios.get(`${baseURL}${endpoint.url}`, {
        timeout: 10000,
        validateStatus: function (status) {
          return status < 500; // Accept any status less than 500
        }
      });
      
      if (response.status === 200) {
        if (typeof response.data === 'object' && response.data !== null) {
          console.log(`✅ ${endpoint.name}: JSON response (${response.status})`);
          if (endpoint.url === '/tutors' && response.data.tutors) {
            console.log(`   📊 Found ${response.data.tutors.length} tutors`);
          }
        } else {
          console.log(`⚠️  ${endpoint.name}: HTML response (${response.status}) - might be frontend`);
        }
      } else {
        console.log(`⚠️  ${endpoint.name}: Status ${response.status}`);
      }
      
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        console.log(`⏰ ${endpoint.name}: Timeout`);
      } else {
        console.log(`❌ ${endpoint.name}: ${error.message}`);
      }
    }
  }
  
  console.log('\n🎯 Testing completed!');
}

testEndpoints();
