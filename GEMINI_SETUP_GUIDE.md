# 🔑 Gemini API Setup Guide

## 📋 Overview

This guide will help you set up the Gemini API key for AI-powered features in your Creative Finance Calculator.

## 🚀 Step-by-Step Instructions

### 1. Get Your Gemini API Key

1. **Visit Google AI Studio**: Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

2. **Sign In**: Use your Google account (ngdev21@gmail.com)

3. **Create API Key**:
   - Click "Create API Key"
   - Choose "Create API Key in new project" or use existing project
   - Copy the generated API key (starts with `AIzaSy...`)

### 2. Update Environment Files

You need to update **two files** with your API key:

#### File 1: `src/environments/environment.ts` (Production)
```typescript
export const environment = {
  production: true,
  firebase: {
    // ... existing Firebase config
  },
  gemini: {
    apiKey: "YOUR_ACTUAL_API_KEY_HERE" // Replace this line
  }
};
```

#### File 2: `src/environments/environment.development.ts` (Development)
```typescript
export const environment = {
  production: false,
  firebase: {
    // ... existing Firebase config
  },
  gemini: {
    apiKey: "YOUR_ACTUAL_API_KEY_HERE" // Replace this line
  }
};
```

### 3. Replace the Placeholder

In both files, replace:
```typescript
apiKey: "YOUR_GEMINI_API_KEY"
```

With your actual API key:
```typescript
apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz"
```

### 4. Restart Development Server

After updating the environment files:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
ng serve
```

## 🧪 Testing the Integration

1. **Visit the Test Page**: Go to [http://localhost:4200](http://localhost:4200)

2. **Check API Key Status**: The test interface will show if your API key is configured

3. **Test Connection**: Click "Test API Connection" to verify the API is working

4. **Test Features**: Try the "Test Deal Analysis" and "Test Creative Financing" buttons

## 🔧 Available AI Features

Once configured, you'll have access to:

### 🤖 Deal Analysis
- Comprehensive property analysis
- Investment recommendations
- Risk assessment
- Cash flow projections

### 💰 Creative Financing Options
- Seller financing strategies
- Lease option structures
- Subject-to financing
- Wraparound mortgages
- Private money lending
- Partnership opportunities

### 📊 Deal Structuring Advice
- Negotiation strategies
- Legal considerations
- Tax implications
- Exit strategies
- Next steps

## 🛡️ Security Best Practices

### ✅ Do's
- Keep your API key secure
- Use environment variables
- Monitor API usage
- Set up billing alerts

### ❌ Don'ts
- Never commit API keys to version control
- Don't share API keys publicly
- Don't use the same key for multiple projects
- Don't exceed rate limits

## 📊 API Usage & Limits

### Free Tier Limits
- **Requests per minute**: 60
- **Requests per day**: 1500
- **Characters per request**: 30,000

### Pricing (After Free Tier)
- **Input**: $0.00025 / 1K characters
- **Output**: $0.0005 / 1K characters

## 🔍 Troubleshooting

### Common Issues

#### 1. "API key not configured" Error
**Solution**: Make sure you've updated both environment files and restarted the server.

#### 2. "Invalid API key" Error
**Solution**: 
- Check that you copied the full API key
- Verify the key starts with `AIzaSy`
- Ensure no extra spaces or characters

#### 3. "Rate limit exceeded" Error
**Solution**: 
- Wait a minute before making another request
- Check your usage in Google AI Studio
- Consider upgrading your plan

#### 4. "Connection failed" Error
**Solution**:
- Check your internet connection
- Verify the API key is correct
- Check if Google AI Studio is accessible

### Debug Steps

1. **Check Environment Files**:
   ```bash
   cat src/environments/environment.ts
   cat src/environments/environment.development.ts
   ```

2. **Check Browser Console**: Open DevTools (F12) and look for errors

3. **Test API Key**: Use the test interface on the home page

4. **Verify in Google AI Studio**: Check if your API key is active

## 📱 Testing Interface

The application includes a built-in test interface at [http://localhost:4200](http://localhost:4200) that will:

- ✅ Check if your API key is configured
- 🔗 Test the API connection
- 📊 Test deal analysis functionality
- 💰 Test creative financing recommendations

## 🎯 Next Steps

After setting up the Gemini API:

1. **Test the Integration**: Use the test interface to verify everything works
2. **Explore Features**: Try different deal scenarios
3. **Customize Prompts**: Modify the AI prompts in `gemini.service.ts` for your specific needs
4. **Monitor Usage**: Keep track of your API usage in Google AI Studio

## 📞 Support

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review Google AI Studio documentation**: [https://ai.google.dev/docs](https://ai.google.dev/docs)
3. **Check the test interface** for specific error messages
4. **Verify your API key** in Google AI Studio

---

## 🎉 Success!

Once you've completed these steps, your Creative Finance Calculator will have powerful AI capabilities for:

- **Intelligent deal analysis**
- **Creative financing recommendations**
- **Risk assessment**
- **Deal structuring advice**
- **Investment optimization**

Your app is now ready for advanced AI-powered real estate analysis! 🚀 