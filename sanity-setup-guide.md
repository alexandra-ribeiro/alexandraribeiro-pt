# Sanity.io Setup Guide

Follow these steps to set up Sanity.io with your website:

## 1. Create a Sanity Account

1. Go to [sanity.io](https://www.sanity.io/) and sign up for a free account
2. Create a new project in the Sanity dashboard

## 2. Configure Sanity Studio

1. Create a new schema for your blog posts using the schema provided in `sanity-schema.js`
2. Deploy your Sanity Studio

## 3. Set Up Environment Variables

Add these environment variables to your Vercel project:

\`\`\`
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
\`\`\`

You can find your Project ID in the Sanity dashboard.

## 4. Create Blog Content

1. Open your Sanity Studio
2. Create author profiles
3. Create blog posts with:
   - Title
   - Slug
   - Publication date
   - Main image
   - Description
   - Content
   - Language (en or pt)

## 5. Deploy Your Website

Deploy your website and your blog should now display content from Sanity!
