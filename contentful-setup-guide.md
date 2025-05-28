# Contentful Setup Guide

Follow these steps to set up Contentful with your website:

## 1. Create a Contentful Account

1. Go to [contentful.com](https://www.contentful.com/) and sign up for a free account
2. Create a new space in the Contentful dashboard

## 2. Create Content Models

### Author Model
1. Create a new content model called "Author"
2. Add the following fields:
   - Name (Short text)
   - Bio (Long text)
   - Picture (Media)

### Blog Post Model
1. Create a new content model called "Blog Post"
2. Add the following fields:
   - Title (Short text) - Required
   - Slug (Short text) - Required, must be unique
   - Description (Long text) - Required
   - Content (Rich text) - Required
   - Featured Image (Media)
   - Published Date (Date & time) - Required
   - Author (Reference to Author) - Optional
   - Language (Short text) - Required, with validation for "en" or "pt"

## 3. Create Content

1. Create at least one author
2. Create blog posts in both English and Portuguese

## 4. Set Up Environment Variables

Add these environment variables to your Vercel project:

\`\`\`
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
\`\`\`

You can find these values in Contentful under Settings > API keys.

## 5. Deploy Your Website

Deploy your website and your blog should now display content from Contentful!

## 6. Managing Content

- Log in to Contentful to create, edit, or delete blog posts
- Changes will be reflected on your website after deployment
- Use the preview feature in Contentful to see how your content will look before publishing
