const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Alisina',
        email: 'admin@example.com',
        password: adminPassword,
        image: 'https://avatars.githubusercontent.com/u/100498538?v=4',
        role: 'admin',
        bio: 'Software Developer who thrives on building elegant and practical solutions. Passionate about scalable backend systems, sleek frontend designs, and efficient infrastructure with expertise in Go, Python, and modern JavaScript frameworks.'
      }
    });

    console.log('Admin user created:', admin.name);

    // Create blog posts
    const posts = [
      {
        title: 'Building Modern Web Applications with Go and React',
        slug: 'building-modern-web-applications-with-go-and-react',
        content: `
          <div class="prose dark:prose-invert">
            <p>Modern full-stack development often requires mastering multiple technologies across different domains. Using Go for backend services with React for frontend applications creates a powerful tech stack that combines performance with great user experiences.</p>
            
            <h2>Why Go for Backend Development?</h2>
            
            <p>Go (or Golang) has gained significant popularity for backend development due to several key advantages:</p>
            
            <ul>
              <li><strong>Performance</strong>: Go's compiled nature and efficient memory management make it incredibly fast.</li>
              <li><strong>Concurrency</strong>: Goroutines and channels make handling concurrent operations simple and effective.</li>
              <li><strong>Simplicity</strong>: With a clean syntax and standard formatting, Go code is easy to read and maintain.</li>
              <li><strong>Strong Typing</strong>: The type system helps catch errors at compile time rather than at runtime.</li>
              <li><strong>Built-in Testing Framework</strong>: Go includes testing tools that simplify creating and running tests.</li>
            </ul>
            
            <h2>React for Dynamic Frontend Interfaces</h2>
            
            <p>On the frontend, React continues to be one of the most popular libraries for building user interfaces.</p>
          </div>
        `,
        coverImage: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613',
        published: true,
        tags: ['golang', 'react', 'fullstack'],
        authorId: admin.id
      },
      {
        title: 'Mastering Microservices with Docker and Kubernetes',
        slug: 'mastering-microservices-with-docker-kubernetes',
        content: `
          <div class="prose dark:prose-invert">
            <p>Exploring how to build, deploy, and scale microservices using Docker containers and Kubernetes orchestration. Learn best practices for containerization and efficient system design.</p>
            
            <h2>Why Microservices?</h2>
            
            <p>Microservices architecture breaks applications into smaller, independent services that can be developed, deployed, and scaled separately.</p>
            
            <h2>Docker for Containerization</h2>
            
            <p>Docker provides a consistent environment across development, testing, and production, making it easier to manage dependencies and ensure reproducibility.</p>
          </div>
        `,
        coverImage: 'https://images.unsplash.com/photo-1621498892236-ebb6c1e3fd37',
        published: true,
        tags: ['docker', 'kubernetes', 'devops'],
        authorId: admin.id
      },
      {
        title: 'Building Real-Time Applications with Vue.js and FastAPI',
        slug: 'building-real-time-applications-vue-fastapi',
        content: `
          <div class="prose dark:prose-invert">
            <p>Learn how to combine Vue.js and FastAPI to create responsive, real-time web applications with high performance and excellent developer experience.</p>
            
            <h2>FastAPI: Speed and Simplicity</h2>
            
            <p>FastAPI is a modern Python web framework that combines the simplicity of Flask with automatic API documentation and high performance.</p>
            
            <h2>Vue.js Reactivity</h2>
            
            <p>Vue.js provides an intuitive reactivity system that makes it easy to build interactive user interfaces that respond instantly to data changes.</p>
          </div>
        `,
        coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
        published: true,
        tags: ['vue', 'fastapi', 'python'],
        authorId: admin.id
      }
    ];

    for (const post of posts) {
      await prisma.post.upsert({
        where: { slug: post.slug },
        update: post,
        create: post
      });
      console.log(`Post created: ${post.title}`);
    }

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 