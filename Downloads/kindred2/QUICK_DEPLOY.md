# ⚡ Quick Deploy Checklist

## 🎯 Fastest Way to Deploy (3 Steps)

### 1️⃣ Database (5 minutes)
- [ ] Sign up at https://www.mongodb.com/cloud/atlas
- [ ] Create FREE cluster
- [ ] Create database user (save password!)
- [ ] Whitelist IP: "Allow Access from Anywhere"
- [ ] Copy connection string: `mongodb+srv://user:pass@cluster.mongodb.net/kindred`

### 2️⃣ Backend (5 minutes)
- [ ] Push code to GitHub
- [ ] Sign up at https://railway.app (use GitHub login)
- [ ] New Project → Deploy from GitHub → **set root to** `Kindred/kindred/kindred-backend`
- [ ] Add environment variables (Railway “Variables” tab):
  - `MONGODB_URI` = your Atlas connection string  
  - `JWT_SECRET` = a long random string (used to sign tokens)  
  - `FRONTEND_URL` = (leave empty for now, add after frontend deploy)  
  - `NODE_ENV` = `production`  
- [ ] Copy backend URL (e.g., `https://xxx.railway.app`)

### 3️⃣ Frontend (5 minutes)
- [ ] Sign up at https://vercel.com (use GitHub login)
- [ ] Import Project → **set root to** `Kindred/kindred`
- [ ] Build settings (Vercel usually auto-detects):
  - Build command: `npm run build`
  - Output dir: `dist`
- [ ] Add environment variable:
  - `VITE_API_URL` = `https://xxx.railway.app/api` (your backend URL)
- [ ] Deploy!
- [ ] Copy frontend URL (e.g., `https://xxx.vercel.app`)

### 4️⃣ Final Step (1 minute)
- [ ] Go back to Railway backend
- [ ] Update `FRONTEND_URL` = your Vercel URL
- [ ] Redeploy backend

## ✅ Done! Your app is live!

**Total time: ~15 minutes** 🚀

---

## 🔗 Quick Links

- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Railway**: https://railway.app
- **Vercel**: https://vercel.com

---

## 💡 Need Help?

See `DEPLOYMENT_GUIDE.md` for detailed instructions.
