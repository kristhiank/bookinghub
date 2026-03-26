import { Calendar, DollarSign, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Link href="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Bookings"
            value="156"
            icon={<Calendar className="h-5 w-5" />}
            trend="+12% from last month"
          />
          <StatsCard
            title="Active Clients"
            value="89"
            icon={<Users className="h-5 w-5" />}
            trend="+5% from last month"
          />
          <StatsCard
            title="Revenue"
            value="$12,543"
            icon={<DollarSign className="h-5 w-5" />}
            trend="+23% from last month"
          />
          <StatsCard
            title="Avg. Duration"
            value="45 min"
            icon={<Clock className="h-5 w-5" />}
            trend="Stable"
          />
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                New Booking
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Add Client
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">Haircut - John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      Today at 2:00 PM
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-sm">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Notice */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Demo Dashboard
          </h3>
          <p className="text-muted-foreground mb-4">
            This is a demo dashboard. Install dependencies and set up the database to enable full functionality.
          </p>
          <code className="block bg-black/5 dark:bg-white/5 p-3 rounded text-sm">
            npm install && npm run db:push && npm run dev
          </code>
        </div>
      </main>
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className="text-muted-foreground">{icon}</div>
        </div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <p className="text-xs text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  );
}
