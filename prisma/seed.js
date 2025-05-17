const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    // Clean up existing data
    console.log('Cleaning up existing data...');
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    await prisma.verificationToken.deleteMany();

    console.log('Creating admin user...');
    // Create admin user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        bio: 'Blog administrator and main content creator.',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    });

    console.log('Creating regular user...');
    // Create regular user
    const regularUser = await prisma.user.create({
      data: {
        name: 'Regular User',
        email: 'user@example.com',
        password: hashedPassword,
        bio: 'Enthusiastic blog reader and occasional commenter.',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
    });

    console.log('Creating sample posts...');
    // Create sample posts
    const post1 = await prisma.post.create({
      data: {
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        content: `
# Getting Started with Next.js

Next.js is a powerful React framework that makes building modern web applications easier and more efficient. In this post, we'll explore the basics of Next.js and how to get started with your first project.

## Why Next.js?

Next.js offers several advantages over plain React:

- **Server-side rendering** for better performance and SEO
- **Static site generation** for blazing fast websites
- **File-based routing** system that's intuitive and easy to use
- **API routes** for building backend functionality without a separate server
- **Built-in CSS and Sass support** with component-level styles

## Setting Up Your First Project

Getting started with Next.js is simple. Here's how:

\`\`\`bash
# Create a new Next.js app
npx create-next-app my-next-app
cd my-next-app

# Start the development server
npm run dev
\`\`\`

Once your server is running, visit http://localhost:3000 to see your app in action.

## Next Steps

Now that you have your Next.js app running, you can:

1. Create new pages in the \`pages\` directory
2. Add components in a \`components\` directory
3. Style your app with CSS Modules or other styling solutions
4. Fetch data using \`getStaticProps\` or \`getServerSideProps\`

Happy coding!
        `,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        published: true,
        tags: ['Next.js', 'React', 'Web Development'],
        authorId: adminUser.id,
      },
    });

    const post2 = await prisma.post.create({
      data: {
        title: 'Mastering Tailwind CSS',
        slug: 'mastering-tailwind-css',
        content: `
# Mastering Tailwind CSS

Tailwind CSS has revolutionized the way we approach styling in web development. Let's dive into how you can master this utility-first CSS framework.

## The Utility-First Approach

Unlike traditional CSS frameworks like Bootstrap, Tailwind provides low-level utility classes that let you build completely custom designs without leaving your HTML.

## Getting Started

Add Tailwind to your project:

\`\`\`bash
npm install -D tailwindcss
npx tailwindcss init
\`\`\`

Configure your template paths in \`tailwind.config.js\`:

\`\`\`js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

## Responsive Design

Tailwind makes responsive design a breeze with breakpoint prefixes:

\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- This div will be full width on mobile, half width on medium screens, and one-third width on large screens -->
</div>
\`\`\`

## Customization

Tailwind is highly customizable. You can extend or override the default theme in your \`tailwind.config.js\` file:

\`\`\`js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1992d4',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    }
  }
}
\`\`\`

With these basics, you're well on your way to mastering Tailwind CSS!
        `,
        coverImage: 'https://images.unsplash.com/photo-1590608897129-79da98d15969',
        published: true,
        tags: ['CSS', 'Tailwind', 'Web Design'],
        authorId: adminUser.id,
      },
    });

    // Add comments to posts
    await prisma.comment.create({
      data: {
        content: 'Great article! I learned a lot about Next.js.',
        authorId: regularUser.id,
        postId: post1.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: 'Tailwind CSS has changed how I approach front-end development. Thanks for sharing these tips!',
        authorId: regularUser.id,
        postId: post2.id,
      },
    });

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 