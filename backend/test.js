// Simple test suite for the backend API
const http = require('http');

const testServer = 'http://localhost:3000';
let testsPassed = 0;
let totalTests = 0;

function runTest(name, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(`✅ ${name}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
  }
}

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${testServer}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => reject(new Error('Request timeout')));
  });
}

async function runTests() {
  console.log('🧪 Running API Tests...\n');

  // Test root endpoint
  runTest('Root endpoint returns welcome message', async () => {
    const response = await makeRequest('/');
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!response.data.message) throw new Error('Missing message field');
    if (!response.data.timestamp) throw new Error('Missing timestamp field');
    if (!response.data.version) throw new Error('Missing version field');
  });

  // Test jokes endpoint
  runTest('Jokes endpoint returns jokes', async () => {
    const response = await makeRequest('/jokes');
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!Array.isArray(response.data.jokes)) throw new Error('Jokes should be an array');
    if (response.data.jokes.length === 0) throw new Error('No jokes returned');
  });

  // Test jokes with limit
  runTest('Jokes endpoint with limit parameter', async () => {
    const response = await makeRequest('/jokes?limit=2');
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (response.data.jokes.length > 2) throw new Error('Limit not working');
  });

  // Test quotes endpoint
  runTest('Quotes endpoint returns quotes', async () => {
    const response = await makeRequest('/quotes');
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!Array.isArray(response.data.quotes)) throw new Error('Quotes should be an array');
    if (response.data.quotes.length === 0) throw new Error('No quotes returned');
  });

  // Test facts endpoint
  runTest('Facts endpoint returns facts', async () => {
    const response = await makeRequest('/facts');
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (!Array.isArray(response.data.facts)) throw new Error('Facts should be an array');
    if (response.data.facts.length === 0) throw new Error('No facts returned');
  });

  // Test health endpoint
  runTest('Health endpoint returns system info', async () => {
    const response = await makeRequest('/health');
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
    if (response.data.status !== 'healthy') throw new Error('Status should be healthy');
    if (typeof response.data.uptime !== 'number') throw new Error('Uptime should be a number');
    if (!response.data.memory) throw new Error('Memory info missing');
  });

  // Test API docs endpoint
  runTest('API documentation endpoint accessible', async () => {
    const response = await makeRequest('/api-docs');
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
  });

  // Test 404 endpoint
  runTest('404 endpoint returns error', async () => {
    const response = await makeRequest('/nonexistent');
    if (response.status !== 404) throw new Error(`Expected 404, got ${response.status}`);
    if (!response.data.error) throw new Error('Error message missing');
  });

  console.log(`\n📊 Test Results: ${testsPassed}/${totalTests} tests passed`);
  
  if (testsPassed === totalTests) {
    console.log('🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed');
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
}

module.exports = { runTests, makeRequest };
