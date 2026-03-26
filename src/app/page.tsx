import Link from "next/link";
import { Calendar, Check, Clock, CreditCard, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">BookingHub</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="text-sm hover:text-primary">
              Features
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-sm hover:text-primary">
              Dashboard
            </Link>
          </nav>
          <div className="flex space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm rounded-md hover:bg-secondary"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Booking Made <span className="text-primary">Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your appointments, manage availability, and grow your business
            with our modern booking platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-medium hover:opacity-90"
            >
              Book Now
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 border-2 border-primary rounded-lg text-lg font-medium hover:bg-primary/5"
            >
              View Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Bookings/Month</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Smart Calendar"
              description="Intuitive calendar view with drag-and-drop functionality and real-time availability"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Team Management"
              description="Manage multiple staff members, their schedules, and service offerings"
            />
            <FeatureCard
              icon={<CreditCard className="h-10 w-10 text-primary" />}
              title="Online Payments"
              description="Secure payment processing with Stripe integration and automatic invoicing"
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="Automated Reminders"
              description="Reduce no-shows with automatic email and SMS reminders"
            />
            <FeatureCard
              icon={<Check className="h-10 w-10 text-primary" />}
              title="Easy Setup"
              description="Get started in minutes with our intuitive onboarding process"
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Custom Branding"
              description="White-label solution with your brand colors, logo, and domain"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">BookingHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern booking platform for service professionals
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="#demo">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2026 BookingHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
