import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy | AliSina Dev',
  description: 'Cookie policy for AliSina Dev blog',
}

export default function CookiePolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>Hey There!</h2>
        <p>
          I'm AliSina, and this is my cookie policy (not the chocolate chip kind, unfortunately!). 
          This page explains how I use cookies and similar technologies on my blog, and what options you have.
        </p>
        
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that websites place on your device to store information. 
          They help make sites work better by remembering your preferences, analyzing site usage, and more.
        </p>
        
        <h2>Cookies I Use</h2>
        <p>
          I use a few different types of cookies on my blog:
        </p>
        <ul>
          <li>
            <strong>Essential cookies:</strong> These help my blog function properly. They enable basic features like page navigation and access to secure areas. 
            My site won't work properly without these cookies!
          </li>
          <li>
            <strong>Preference cookies:</strong> These remember your choices (like dark mode vs. light mode) to make your experience better.
          </li>
          <li>
            <strong>Authentication cookies:</strong> If you create an account or log in, I use cookies to remember you're logged in.
          </li>
          <li>
            <strong>Analytics cookies:</strong> I use these to understand how visitors interact with my blog, which helps me improve it.
          </li>
        </ul>
        
        <h2>Third-Party Cookies</h2>
        <p>
          Some cookies are placed by third-party services I use:
        </p>
        <ul>
          <li><strong>Google Analytics:</strong> Helps me understand traffic patterns</li>
          <li><strong>Authentication providers:</strong> If you sign in with Google or GitHub, they may set their own cookies</li>
        </ul>
        
        <h2>Managing Cookies</h2>
        <p>
          You have a few options for managing cookies:
        </p>
        <ul>
          <li>Most browsers let you block or delete cookies in your settings</li>
          <li>You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
        </ul>
        <p>
          Keep in mind that blocking cookies might affect how my blog works for you. For example, if you block essential cookies, 
          some features might not function properly.
        </p>
        
        <h2>Changes to This Policy</h2>
        <p>
          I might update this cookie policy from time to time. I'll post the new version here and update the "last updated" date.
        </p>
        
        <h2>Contact Me</h2>
        <p>
          If you have questions about my cookie policy, please <Link href="/contact" className="text-primary hover:underline">reach out to me</Link> directly.
        </p>
      </div>
    </div>
  );
} 