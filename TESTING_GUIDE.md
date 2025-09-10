# AI Extension Recommendation Testing Guide

## Setup Instructions

1. **API Key Configuration**
   - Get your Gemini API key from [Google AI Studio](https://ai.google.dev/)
   - Update the `.env` file with your API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

2. **Start the Application**
   ```bash
   npm run dev
   ```

## Test Scenarios

### Test Case 1: Request APPROVED Extension (Should be approved)
**Test with uBlock Origin (already approved):**
- **Name:** Your Name
- **Email:** test@example.com
- **Extension Name:** uBlock Origin
- **Extension ID:** cjpalhdlnbpafiamejdnhcphjbkeiagm
- **Category:** Privacy & Security

**Expected Result:** ✅ APPROVED - Extension matches existing approved list

### Test Case 2: Request SIMILAR to Approved (Should be approved)
**Test with similar ad blocker:**
- **Name:** Your Name
- **Email:** test@example.com
- **Extension Name:** AdBlock Plus
- **Extension ID:** cfhdojbkjhnklbpkdaibdccddilifddb
- **Category:** Privacy & Security

**Expected Result:** ✅ APPROVED - Similar to uBlock Origin, good security practices

### Test Case 3: Request BLOCKED Extension (Should be denied)
**Test with suspicious VPN:**
- **Name:** Your Name
- **Email:** test@example.com
- **Extension Name:** Free VPN Super Fast
- **Extension ID:** malicious123456789
- **Category:** Privacy & Security

**Expected Result:** ❌ DENIED - Extension is in blocked list, security concerns

### Test Case 4: Request UNKNOWN Extension (AI Decision)
**Test with legitimate extension:**
- **Name:** Your Name
- **Email:** test@example.com
- **Extension Name:** Grammarly
- **Extension ID:** kbfnbcaeplbcioakkpcpgfkobkghlhen
- **Category:** Productivity

**Expected Result:** ✅ APPROVED - High rating, millions of users, reputable company

### Test Case 5: Request SUSPICIOUS Extension (Should be denied)
**Test with suspicious extension:**
- **Name:** Your Name
- **Email:** test@example.com
- **Extension Name:** Free Download Manager Pro
- **Extension ID:** suspicious123456
- **Category:** Productivity

**Expected Result:** ❌ DENIED - Name patterns suggest adware/malware

### Test Case 6: Request DEVELOPER TOOL (Should be approved)
**Test with developer extension:**
- **Name:** Your Name
- **Email:** test@example.com
- **Extension Name:** Chrome DevTools
- **Extension ID:** fmkadmapgofadopljbjfkapdkoienihi
- **Category:** Developer Tools

**Expected Result:** ✅ APPROVED - Already approved, essential dev tool

### Test Case 7: Request GAMING Extension (May be rejected by policy)
**Test with gaming extension:**
- **Name:** Your Name
- **Email:** test@example.com
- **Extension Name:** Steam Inventory Helper
- **Extension ID:** cmeakgjggjdlcpncigglobpjbkabhmjl
- **Category:** Entertainment

**Expected Result:** 🟡 REVIEW/APPROVE - Legitimate gaming tool, not cheating software

### Test Case 8: Request POPULAR Extension (Should be approved)
**Test with well-known extension:**
- **Name:** Your Name
- **Email:** test@example.com
- **Extension Name:** LastPass
- **Extension ID:** hdokiejnpimakedhajhdlcegeplioahd
- **Category:** Privacy & Security

**Expected Result:** ✅ APPROVED - Similar to Bitwarden (approved), reputable password manager

## What the AI Analyzes

### Security Criteria:
1. **Rating Score:** 4.0+ preferred for approval
2. **User Base:** 500,000+ users indicates trust
3. **Name Patterns:** Flags suspicious words like "Free", "Pro", "Hack"
4. **Category Matching:** Compares with approved extensions in same category
5. **Functionality Analysis:** Checks for legitimate vs suspicious purposes

### Decision Factors:
- **APPROVE:** High rating, large user base, legitimate functionality, similar to approved extensions
- **DENY:** Low rating, suspicious patterns, matches blocked list, security red flags
- **REVIEW:** Borderline cases that need manual review

## AI Response Analysis

The AI will provide:
1. **Recommendation:** APPROVE/DENY/REVIEW
2. **Detailed Reasoning:** Why the decision was made
3. **Security Concerns:** Any red flags identified
4. **Similar Extensions:** Alternative approved extensions if denied
5. **Risk Assessment:** Security and policy compliance evaluation

## Common AI Responses

### For Approved Extensions:
- "High rating and large user base indicate trustworthiness"
- "Similar functionality to already approved extensions"
- "No security red flags detected"

### For Denied Extensions:
- "Low rating suggests user dissatisfaction or potential issues"
- "Name pattern suggests potential adware/malware"
- "Similar to extensions in blocked list"
- "Security concerns identified"

### For Review Cases:
- "Legitimate functionality but requires policy review"
- "Good rating but limited user base"
- "New extension without established track record"

## Troubleshooting

1. **API Key Issues:** Check console for "API key required" errors
2. **Rate Limiting:** Gemini has usage limits, retry after a few seconds
3. **JSON Parsing:** Fixed in latest version, should handle markdown responses
4. **Network Issues:** Check internet connection and API status

## Mock Data Available

- **5 Approved Extensions:** uBlock Origin, Bitwarden, React DevTools, Honey, Dark Reader
- **10 Blocked Extensions:** Various malware, adware, and suspicious extensions
- **2 Rejected Extensions:** Gaming cheats, anonymous proxy tools

The AI compares requests against this data to make informed recommendations.
