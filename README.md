# Alisina Dev Blog

A modern, full-featured blog built with Next.js, Tailwind CSS, and MongoDB.

## Features

- 🔐 Authentication with NextAuth (Credentials, GitHub, Google)
- 📝 Full-featured blog with posts, comments, and categories
- 👤 User profiles and admin dashboard
- 🌓 Dark/light theme support
- 📱 Responsive design with Tailwind CSS and DaisyUI
- 🚀 Fast and SEO-friendly with Next.js

## Getting Started Locally

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/blog.git
   cd blog
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create `.env` file in the root directory:
   ```
   # Database
   DATABASE_URL="mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/blog?retryWrites=true&w=majority"

   # Authentication
   NEXTAUTH_SECRET="your-nextauth-secret-key-should-be-at-least-32-chars"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth providers (optional)
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. Initialize the database:
   ```
   npm run db:push
   ```

5. Seed the database with sample data:
   ```
   npm run seed
   ```

6. Start the development server:
   ```
   npm run dev
   ```

7. Access the blog at http://localhost:3000

## Deploying on Replit

1. Create a new Replit using "Import from GitHub"

2. Add environment variables in the "Secrets" panel:
   - `DATABASE_URL`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: A random string for encryption
   - `NEXTAUTH_URL`: Your Replit URL
   - `GITHUB_ID` and `GITHUB_SECRET`: For GitHub auth (optional)
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: For Google auth (optional)

3. Install dependencies and set up the database:
   ```
   npm install
   npm run db:push
   npm run seed
   ```

4. Run the blog:
   ```
   npm run build
   npm start
   ```

## MongoDB Setup

1. Create a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account
2. Create a new cluster and choose the free tier
3. In "Network Access," add `0.0.0.0/0` to allow connections from anywhere
4. In "Database Access," create a database user with password authentication
5. On your cluster, click "Connect" → "Connect your application" and copy the connection string
6. Replace the placeholders in your connection string with your actual username and password

## OAuth Credentials Setup

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set the Homepage URL to your Replit URL or http://localhost:3000
4. Set the Authorization callback URL to your Replit URL + "/api/auth/callback/github" 
   or "http://localhost:3000/api/auth/callback/github"

### Google OAuth
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Go to "APIs & Services" → "Credentials"
4. Configure the OAuth consent screen
5. Create OAuth client ID credentials
6. Set Authorized JavaScript origins to your Replit URL or http://localhost:3000
7. Set Authorized redirect URIs to your Replit URL + "/api/auth/callback/google" 
   or "http://localhost:3000/api/auth/callback/google"

## Default Admin Login

After running the seed script, you can log in with:
- Email: admin@example.com
- Password: admin123

## License

[MIT](LICENSE)
