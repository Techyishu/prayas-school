# Prayas School - Complete Admin Panel Setup Guide

## 🎉 What's Been Implemented

Your Prayas School website now has a fully functional admin panel with the following features:

### ✅ Completed Features

1. **Contact Form Submissions** 
   - Contact form on `/contact` page saves to Supabase
   - Admin can view all submissions at `/admin/contacts`
   - View details and delete submissions

2. **Admission Inquiries**
   - Admission form on `/admissions` page saves to Supabase
   - Admin can view all inquiries at `/admin/admissions`
   - View full details, call parents, or send emails directly

3. **Toppers Management**
   - New `/toppers` page displays school toppers
   - Removed "Academics" link from navbar
   - Admin can add/delete toppers at `/admin/toppers`
   - Upload student photos
   - Rank badges (1st, 2nd, 3rd place)

4. **Faculty Management**
   - `/faculty` page now fetches from Supabase
   - Admin can add/delete faculty at `/admin/faculty`
   - Upload faculty photos
   - Add bio/description

5. **Updated Admin Dashboard**
   - Shows stats for all sections
   - Quick action cards for easy navigation
   - Clickable stat cards to jump to sections

6. **Gallery & SLC** (Already existed)
   - Gallery management at `/admin/gallery`
   - SLC management at `/admin/slc`

## 📋 Setup Instructions

### Step 1: Run Database Migration

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql`
4. Click **Run** to create all tables

### Step 2: Create Storage Buckets

1. In Supabase Dashboard, go to **Storage**
2. Create a new bucket called `toppers`
   - Make it **public**
3. Create a new bucket called `faculty`
   - Make it **public**

### Step 3: Test the System

1. **Test Contact Form**:
   - Go to `/contact`
   - Fill out and submit the form
   - Check `/admin/contacts` to see the submission

2. **Test Admission Form**:
   - Go to `/admissions`
   - Fill out and submit the form
   - Check `/admin/admissions` to see the inquiry

3. **Add a Topper**:
   - Go to `/admin/toppers`
   - Click "Add New Topper"
   - Fill in details and upload a photo
   - Check `/toppers` to see it displayed

4. **Add Faculty**:
   - Go to `/admin/faculty`
   - Click "Add Faculty Member"
   - Fill in details and upload a photo
   - Check `/faculty` to see it displayed

## 🗄️ Database Schema

### Tables Created

| Table Name | Purpose | Fields |
|------------|---------|--------|
| `contact_submissions` | Contact form submissions | name, email, phone, visa_type, message |
| `admission_submissions` | Admission inquiries | parent_name, phone, email, student_name, grade, message |
| `toppers` | School toppers | name, class_grade, percentage, year, rank, image_url, achievement |
| `faculty` | Faculty members | name, role, subject, experience, image_url, bio |

### Storage Buckets

| Bucket Name | Purpose | Public |
|-------------|---------|--------|
| `toppers` | Student topper photos | ✅ Yes |
| `faculty` | Faculty member photos | ✅ Yes |

## 🔐 Security

All tables have **Row Level Security (RLS)** enabled:

- **Public users** can:
  - Submit contact forms
  - Submit admission inquiries
  - View toppers
  - View faculty

- **Authenticated users (admin)** can:
  - View all submissions
  - Delete submissions
  - Add/edit/delete toppers
  - Add/edit/delete faculty
  - Upload images

## 📱 Admin Panel Navigation

Access the admin panel at `/admin` with these sections:

- **Dashboard** - Overview and stats
- **Messages** - Contact form submissions
- **Admissions** - Admission inquiries
- **Toppers** - Manage school toppers
- **Faculty** - Manage faculty members
- **SLC** - Student Life Committee
- **Gallery** - Photo gallery
- **Blog** - Blog posts
- **Services** - School services

## 🎨 Features Highlights

### Contact & Admission Forms
- ✅ Real-time validation
- ✅ Loading states
- ✅ Success messages
- ✅ Error handling
- ✅ Saves to Supabase

### Toppers Page
- ✅ Beautiful rank badges (gold, silver, bronze)
- ✅ Student photos
- ✅ Percentage display
- ✅ Achievement notes
- ✅ Responsive grid layout

### Faculty Page
- ✅ Professional layout
- ✅ Faculty photos
- ✅ Role and subject display
- ✅ Experience years
- ✅ Bio/description

### Admin Panel
- ✅ Modern dark theme
- ✅ Animated components
- ✅ Easy navigation
- ✅ Quick actions
- ✅ Real-time stats

## 🚀 Next Steps

1. **Add Content**:
   - Add your school's toppers
   - Add faculty members
   - Update gallery with school photos
   - Add SLC members

2. **Customize**:
   - Update colors in `globals.css` if needed
   - Add more fields to forms if required
   - Customize email templates

3. **Monitor**:
   - Check contact submissions regularly
   - Respond to admission inquiries
   - Keep toppers and faculty updated

## 📝 File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── contact/route.ts          # Contact form API
│   │   └── admissions/route.ts       # Admission form API
│   ├── admin/(dashboard)/
│   │   ├── page.tsx                  # Dashboard
│   │   ├── layout.tsx                # Admin layout
│   │   ├── contacts/                 # Contact submissions
│   │   ├── admissions/               # Admission inquiries
│   │   ├── toppers/                  # Toppers management
│   │   ├── faculty/                  # Faculty management
│   │   ├── gallery/                  # Gallery management
│   │   ├── slc/                      # SLC management
│   │   ├── blog/                     # Blog management
│   │   └── services/                 # Services management
│   ├── toppers/page.tsx              # Public toppers page
│   ├── faculty/page.tsx              # Public faculty page
│   ├── admissions/page.tsx           # Admissions page
│   └── contact/page.tsx              # Contact page
└── components/
    └── sections/
        └── contact-form.tsx          # Contact form component
```

## 🐛 Troubleshooting

### Forms not submitting?
- Check Supabase connection in `.env.local`
- Verify tables exist in Supabase
- Check browser console for errors

### Images not uploading?
- Verify storage buckets exist
- Check bucket permissions (should be public)
- Ensure file size is under 50MB

### Can't see submissions in admin?
- Make sure you're logged in
- Check RLS policies in Supabase
- Verify table names match exactly

## 💡 Tips

1. **Regular Backups**: Export your Supabase data regularly
2. **Image Optimization**: Compress images before uploading
3. **Mobile Testing**: Test all forms on mobile devices
4. **Email Notifications**: Consider adding email notifications for new submissions
5. **Analytics**: Track form submissions and page views

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify Supabase connection
3. Check that all tables and buckets exist
4. Ensure RLS policies are correctly set

---

**Congratulations!** 🎉 Your Prayas School admin panel is now fully functional!
