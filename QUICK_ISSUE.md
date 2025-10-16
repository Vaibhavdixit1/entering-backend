# Quick Issue for Quickdraw Badge

**Title:** Add API rate limiting for better performance

**Description:** 
Implement rate limiting middleware to prevent API abuse and improve server performance. This will help protect the backend from excessive requests.

**Labels:** enhancement, performance

**Steps to reproduce:**
1. Make multiple rapid requests to the API
2. Server should handle gracefully with rate limiting

**Expected behavior:**
- API should have rate limiting (e.g., 100 requests per minute)
- Should return 429 status code when limit exceeded
- Should include rate limit headers in response

**Actual behavior:**
- Currently no rate limiting implemented

**Solution:**
Add express-rate-limit middleware to the backend server.

---

**Note:** This issue was created and closed within 5 minutes to earn the Quickdraw badge! 🎯
