import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | AliSina Dev',
  description: 'Privacy policy for AliSina Dev blog',
}

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>Introduction</h2>
        <p>
          Hey there! I&apos;m AliSina, the developer behind this blog. I take your privacy seriously, and I want to be transparent about how I collect and use your data.
          This privacy policy explains what information I gather when you visit my blog and how I use it.
        </p>
        
        <h2>Information I Collect</h2>
        <p>
          When you visit my blog, I may collect some basic information:
        </p>
        <ul>
          <li><strong>Account information:</strong> If you create an account, I&apos;ll store your email address, name (if provided), and securely hashed password.</li>
          <li><strong>Usage data:</strong> I use analytics to understand how visitors interact with my blog, including which pages are visited, how long you stay, and which features you use.</li>
          <li><strong>Comments and contributions:</strong> If you leave comments or interact with posts, I&apos;ll store that content along with your user information.</li>
        </ul>
        
        <h2>How I Use Your Information</h2>
        <p>
          I use the information I collect to:
        </p>
        <ul>
          <li>Provide, maintain, and improve my blog</li>
          <li>Understand how you use my blog so I can make it better</li>
          <li>Respond to your comments and questions</li>
          <li>Send you updates about new content (if you opt in)</li>
        </ul>
        
        <h2>Cookies</h2>
        <p>
          I use cookies for a few important reasons:
        </p>
        <ul>
          <li>To keep you logged in (if you create an account)</li>
          <li>To remember your preferences (like dark mode)</li>
          <li>To understand how you use my blog</li>
        </ul>
        <p>
          You can disable cookies in your browser settings, but this might affect your experience.
        </p>
        
        <h2>Third-Party Services</h2>
        <p>
          I use a few third-party services to help run my blog:
        </p>
        <ul>
          <li><strong>Google Analytics:</strong> To understand traffic patterns</li>
          <li><strong>MongoDB Atlas:</strong> To store data</li>
          <li><strong>Authentication providers:</strong> If you sign in with Google or GitHub, they have their own privacy policies</li>
        </ul>
        
        <h2>Data Security</h2>
        <p>
          I do my best to protect your data using industry-standard security measures, but no system is 100% secure. I&apos;ll notify you if there&apos;s ever a breach affecting your personal information.
        </p>
        
        <h2>Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access the personal information I have about you</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Download your data</li>
        </ul>
        <p>
          If you want to exercise any of these rights, just <Link href="/contact" className="text-primary hover:underline">contact me</Link>.
        </p>
        
        <h2>Changes to This Policy</h2>
        <p>
          I might update this privacy policy from time to time. I&apos;ll post the new version here and update the &quot;last updated&quot; date.
        </p>
        
        <h2>Contact Me</h2>
        <p>
          If you have questions about this privacy policy, please <Link href="/contact" className="text-primary hover:underline">reach out to me</Link> directly.
        </p>
      </div>
    </div>
  );
} 