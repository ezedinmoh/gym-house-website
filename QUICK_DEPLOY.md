# ⚡ Quick Deploy Guide

Deploy your Gym House website in 10 minutes!

---

## 🚀 Step 1: Push to GitHub (5 minutes)

Open terminal in your project folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Gym House website"
```

Now create a repository on GitHub:
1. Go to https://github.com/new
2. Name: `gym-house-website`
3. Click "Create repository"
4. Run these commands (replace YOUR-USERNAME):

```bash
git remote add origin https://github.com/YOUR-USERNAME/gym-house-website.git
git branch -M main
git push -u origin main
```

✅ **Done! Your code is on GitHub**

---

## 🌐 Step 2: Deploy to Netlify (5 minutes)

### Option A: Connect GitHub (Recommended)

1. Go to https://app.netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import from Git"
4. Choose GitHub → Select your repository
5. Click "Deploy site"

**Your site is live!** 🎉

### Option B: Drag & Drop (Fastest)

1. Go to https://app.netlify.com/drop
2. Drag your project folder
3. Done!

---

## 🎨 Customize Your URL

1. In Netlify dashboard, click "Site settings"
2. Click "Change site name"
3. Enter: `gym-house-ezedin`
4. Your URL: `https://gym-house-ezedin.netlify.app`

---

## ✅ Verify Your Site

Visit your URL and check:
- ✅ Home page loads
- ✅ All pages work
- ✅ Calculators function
- ✅ Dark mode toggles
- ✅ Mobile responsive

---

## 🔄 Update Your Site

After making changes:

```bash
git add .
git commit -m "Updated features"
git push
```

Netlify auto-deploys in 1-2 minutes! 🚀

---

## 🆘 Troubleshooting

**Git not found?**
- Install from https://git-scm.com

**Can't push to GitHub?**
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

**Site not loading?**
- Check Netlify deploy logs
- Verify all files uploaded

---

## 📞 Need Help?

- Email: ezedinmoh1@gmail.com
- GitHub: @ezedinmoh

---

**Congratulations! Your site is live!** 🎊

Share it: `https://your-site.netlify.app`
