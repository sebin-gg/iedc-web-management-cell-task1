# 🚀 Easy Deployment Guide for Kindred

This guide will help you deploy your Kindred app in the **easiest way possible** using free hosting services.

## 📋 Overview

You'll deploy:
- **Frontend (React)**: Vercel (free, easiest)
- **Backend (Node.js)**: Railway or Render (both free)
- **Database (MongoDB)**: MongoDB Atlas (free tier)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

1. **Create Account**: Go to https://www.mongodb.com/cloud/atlas/register
2. **Create Free Cluster**:
   - Click "Build a Database"
   - Choose "FREE" (M0 Sandbox)
   - Select a cloud provider and region (closest to you)
   - Click "Create"
3. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Username: `kindreduser` (or your choice)
   - Password: Generate a secure password (save it!)
   - Click "Add User"
4. **Whitelist IP Address**:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add specific IPs for production
5. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
   - Replace `<password>` with your database user password
   - Add database name: `mongodb+srv://username:password@cluster.mongodb.net/kindred?retryWrites=true&w=majority`

**Save this connection string!** You'll need it for the backend.

---

## 🔧 Step 2: Deploy Backend (Railway - Easiest Option)

### Option A: Railway (Recommended - Easiest)

1. **Sign Up**: Go to https://railway.app and sign up with GitHub
2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your repository
   - Choose the `Kindred/kindred/kindred-backend` folder
3. **Add Environment Variables**:
   - In Railway dashboard, go to "Variables"
   - Add these variables:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string_here
     JWT_SECRET=your_super_secret_jwt_key_here_use_random_string
     PORT=5000
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-url.vercel.app
     ```
4. **Deploy**:
   - Railway will automatically detect it's a Node.js app
   - It will run `npm install` and `npm start`
   - Wait for deployment to complete
5. **Get Backend URL**:
   - Railway will give you a URL like: `https://your-app.railway.app`
   - Copy this URL! You'll need it for the frontend

### Option B: Render (Alternative)

1. **Sign Up**: Go to https://render.com and sign up
2. **Create New Web Service**:
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Select the `kindred-backend` folder
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Add Environment Variables** (same as Railway)
4. **Deploy** and get your backend URL

---

## 🎨 Step 3: Deploy Frontend (Vercel - Easiest)

1. **Sign Up**: Go to https://vercel.com and sign up with GitHub
2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - **Root Directory**: Select `Kindred/kindred` (the frontend folder)
3. **Configure Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Add Environment Variable**:
   - Go to "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app/api`
   - (Use your Railway/Render backend URL)
5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Vercel will give you a URL like: `https://your-app.vercel.app`

6. **Update Backend CORS**:
   - Go back to Railway/Render
   - Update `FRONTEND_URL` environment variable to your Vercel URL
   - Redeploy the backend

---

## ✅ Step 4: Test Your Deployment

1. Visit your Vercel frontend URL
2. Try registering a new user
3. Check if everything works!

---

## 🔄 Quick Deploy Commands (If Using Git)

### Initial Setup:
```bash
# In your project root
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/kindred.git
git push -u origin main
```

### After Making Changes:
```bash
git add .
git commit -m "Your changes"
git push
```
Both Vercel and Railway will automatically redeploy!

---

## 📝 Environment Variables Summary

### Backend (Railway/Render):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kindred?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_random_string_here
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel):
```
VITE_API_URL=https://your-backend.railway.app/api
```

---

## 🆘 Troubleshooting

### Backend Issues:
- **MongoDB Connection Error**: Check your MongoDB Atlas connection string and IP whitelist
- **CORS Error**: Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly
- **Port Error**: Railway/Render sets PORT automatically, don't hardcode it

### Frontend Issues:
- **API Not Found**: Check `VITE_API_URL` is set correctly in Vercel
- **Build Fails**: Check build logs in Vercel dashboard

---

## 🎉 You're Done!

Your app should now be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app`

All services offer free tiers that should be enough for development and small projects!

---

## 💡 Pro Tips

1. **Custom Domain**: Vercel and Railway both support custom domains (free)
2. **Auto Deploy**: Every push to GitHub automatically deploys
3. **Preview Deployments**: Vercel creates preview URLs for every pull request
4. **Monitoring**: Check Railway/Render logs if something breaks
5. **Database**: MongoDB Atlas free tier gives you 512MB (enough for testing)

---

## 📚 Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
