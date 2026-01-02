import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Star,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import type { Business, BusinessStats } from '@shared/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
export function HomePage() {
  const { data: stats, isLoading: statsLoading } = useQuery<BusinessStats>({
    queryKey: ['dashboard-stats'],
    queryFn: () => api<BusinessStats>('/api/dashboard/stats'),
  });
  const { data: businesses, isLoading: bizLoading } = useQuery<{ items: Business[] }>({
    queryKey: ['businesses'],
    queryFn: () => api<{ items: Business[] }>('/api/businesses'),
  });
  const chartData = [
    { name: 'Mon', views: 2400 },
    { name: 'Tue', views: 3200 },
    { name: 'Wed', views: 2800 },
    { name: 'Thu', views: 4500 },
    { name: 'Fri', views: 3900 },
    { name: 'Sat', views: 5200 },
    { name: 'Sun', views: 4800 },
  ];
  const needsAttention = businesses?.items
    ?.filter(b => b.rating < 4.0 || b.status === 'Flagged')
    ?.sort((a, b) => a.rating - b.rating)
    ?.slice(0, 3) || [];
  return (
    <AppLayout container>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Performance Overview</h1>
          <p className="text-muted-foreground">Welcome back. Here is how your business locations are performing this week.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Locations"
            value={stats?.totalLocations}
            icon={<LayoutDashboard className="h-4 w-4" />}
            loading={statsLoading}
          />
          <StatCard
            title="Avg Rating"
            value={stats?.averageRating.toFixed(1)}
            icon={<Star className="h-4 w-4" />}
            loading={statsLoading}
            trend="+0.2 this month"
            isPositive
          />
          <StatCard
            title="Total Reviews"
            value={stats?.totalReviews.toLocaleString()}
            icon={<Users className="h-4 w-4" />}
            loading={statsLoading}
          />
          <StatCard
            title="Profile Views"
            value={stats?.totalViews.toLocaleString()}
            icon={<TrendingUp className="h-4 w-4" />}
            loading={statsLoading}
            trend="+12% vs last week"
            isPositive
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4 shadow-soft">
            <CardHeader>
              <CardTitle>Discovery Insights</CardTitle>
              <CardDescription>Views across all tracked Google Business Profiles</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3 shadow-soft overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <CardTitle>Needs Attention</CardTitle>
              </div>
              <CardDescription>High priority items for your review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bizLoading ? (
                  Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)
                ) : needsAttention.length > 0 ? (
                  needsAttention.map((biz) => (
                    <Link
                      key={biz.id}
                      to={`/locations/${biz.id}`}
                      className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent transition-all duration-200 hover:shadow-sm"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{biz.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{biz.address}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold">{biz.rating}</span>
                        </div>
                        <Badge variant={biz.status === 'Flagged' ? 'destructive' : 'outline'} className="text-[10px] h-4 py-0">
                          {biz.status}
                        </Badge>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
                    All locations are performing well!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
function StatCard({ title, value, icon, loading, trend, isPositive }: {
  title: string;
  value: any;
  icon: React.ReactNode;
  loading: boolean;
  trend?: string;
  isPositive?: boolean;
}) {
  return (
    <Card className="shadow-soft hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-foreground/70">{icon}</div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <>
            <div className="text-2xl font-bold tracking-tight">{value ?? '0'}</div>
            {trend && (
              <div className="flex items-center mt-2">
                {isPositive ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-rose-500 mr-1" />
                )}
                <p className={cn("text-xs font-medium", isPositive ? "text-emerald-500" : "text-rose-500")}>
                  {trend}
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}