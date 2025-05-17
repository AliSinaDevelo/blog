import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | AliSina Dev',
  description: 'Terms of service for AliSina Dev blog',
}

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>Welcome!</h2>
        <p>
          Hi there! I'm AliSina, and I'm thrilled you're visiting my blog. These Terms of Service outline the rules and guidelines for using my site. 
          By accessing or using this blog, you're agreeing to these terms, so please read them carefully.
        </p>
        
        <h2>Using My Content</h2>
        <p>
          All the content on this blog—including articles, code snippets, images, and designs—is my intellectual property. Here's how you can use it:
        </p>
        <ul>
          <li>You're welcome to read, share links to, and reference my content.</li>
          <li>For code snippets, you can use them in your projects (attribution is appreciated but not required).</li>
          <li>If you want to republish my articles or use my content for commercial purposes, please <Link href="/contact" className="text-primary hover:underline">contact me</Link> first.</li>
        </ul>
        
        <h2>User Accounts</h2>
        <p>
          If you create an account on my blog:
        </p>
        <ul>
          <li>You're responsible for maintaining the security of your account and password.</li>
          <li>You're responsible for all activities that happen under your account.</li>
          <li>I reserve the right to terminate accounts that violate these terms or for inactive accounts.</li>
        </ul>
        
        <h2>User-Generated Content</h2>
        <p>
          If you leave comments or contribute content to my blog:
        </p>
        <ul>
          <li>You retain ownership of your content, but you grant me a license to display, store, and use it on my blog.</li>
          <li>Your content must not violate any laws or infringe on anyone's rights.</li>
          <li>I reserve the right to remove content that I find objectionable or that violates these terms.</li>
        </ul>
        
        <h2>Acceptable Use</h2>
        <p>
          When using my blog, please don't:
        </p>
        <ul>
          <li>Engage in illegal activities</li>
          <li>Harass, abuse, or harm others</li>
          <li>Distribute spam or malware</li>
          <li>Attempt to access restricted areas of the site</li>
          <li>Impersonate me or other users</li>
        </ul>
        
        <h2>Third-Party Links and Services</h2>
        <p>
          My blog may contain links to third-party websites or services that aren't under my control. I'm not responsible for the content or practices of these sites.
        </p>
        
        <h2>Limitation of Liability</h2>
        <p>
          I strive to provide accurate and helpful information, but I can't guarantee that my content is always error-free or up-to-date. 
          I'm not liable for any damages resulting from your use of, or inability to use, my blog.
        </p>
        
        <h2>Changes to These Terms</h2>
        <p>
          I may update these Terms of Service from time to time. I'll post the new version here and update the "last updated" date.
        </p>
        
        <h2>Contact Me</h2>
        <p>
          If you have questions about these terms, please <Link href="/contact" className="text-primary hover:underline">contact me</Link> directly.
        </p>
      </div>
    </div>
  );
} 