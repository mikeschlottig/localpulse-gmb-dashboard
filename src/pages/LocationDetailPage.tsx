import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Phone, 
  Globe, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  MessageSquare,
  BarChart3,
  RefreshCw,
  MoreVertical,
  Reply
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import type { Business, Review, LocationInsights, ProfileHealth } from '@shared/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
export function LocationDetailPage() {
  const { id } = useParams();
  const { data: business, isLoading: bizLoading } = useQuery<Business>({
    queryKey: ['business', id],
    queryFn: () => api<Business>(`/api/businesses/${id}`),
  });
  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ['reviews', id],
    queryFn: () => api<Review[]>(`/api/businesses/${id}/reviews`),
  });
  const { data: insights, isLoading: insightsLoading } = useQuery<LocationInsights>({
    queryKey: ['insights', id],
    queryFn: () => api<LocationInsights>(`/api/businesses/${id}/insights`),
  });
  const { data: health, isLoading: healthLoading } = useQuery<ProfileHealth>({
    queryKey: ['health', id],
    queryFn: () => api<ProfileHealth>(`/api/businesses/${id}/health`),
  });
  if (bizLoading) return <LoadingState />;
  const actionData = insights ? [
    { name: 'Calls', value: insights.actions.calls, color: '#4F46E5' },
    { name: 'Directions', value: insights.actions.directions, color: '#10B981' },
    { name: 'Website', value: insights.actions.website, color: '#F59E0B' },
  ] : [];
  const healthScore = health ? [
    health.phoneVerified,
    health.websiteLinked,
    health.hoursSet,
    health.descriptionSet,
    health.photosCount > 10
  ].filter(Boolean).length * 20 : 0;
  return (
    <AppLayout container>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <Link to="/locations" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Locations
            </Link>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{business?.name}</h1>
                <Badge variant={business?.status === 'Verified' ? 'default' : 'secondary'} className="rounded-full">
                  {business?.status}
                </Badge>
              </div>
              <p className="text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {business?.address}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button className="btn-gradient shadow-primary">Edit Profile</Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* Navigation Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-muted/50 p-1 rounded-xl h-auto flex flex-wrap gap-1">
            <TabsTrigger value="overview" className="rounded-lg px-6 py-2 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg px-6 py-2 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="insights" className="rounded-lg px-6 py-2 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Insights
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <DetailStat title="Overall Rating" value={business?.rating} icon={<Star className="h-5 w-5 text-amber-500 fill-amber-500" />} />
              <DetailStat title="Total Reviews" value={business?.reviewCount} icon={<MessageSquare className="h-5 w-5 text-indigo-500" />} />
              <DetailStat title="Health Score" value={`${healthScore}%`} icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} />
              <DetailStat title="Profile Views" value={business?.views} icon={<BarChart3 className="h-5 w-5 text-blue-500" />} />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2 shadow-soft">
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                  <CardDescription>Improve your profile to rank higher in local search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Total Progress</span>
                      <span className="text-muted-foreground">{healthScore}%</span>
                    </div>
                    <Progress value={healthScore} className="h-2" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <HealthItem label="Phone Verified" checked={health?.phoneVerified} />
                    <HealthItem label="Website Linked" checked={health?.websiteLinked} />
                    <HealthItem label="Hours Configured" checked={health?.hoursSet} />
                    <HealthItem label="Description Set" checked={health?.descriptionSet} />
                    <HealthItem label="Photos Uploaded" checked={health ? health.photosCount > 10 : false} subtext={`${health?.photosCount || 0} photos`} />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <Phone className="h-4 w-4" /> Update Phone
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <Globe className="h-4 w-4" /> Link Website
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <Clock className="h-4 w-4" /> Adjust Hours
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>Manage and respond to your latest feedback</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="px-3">All Reviews</Badge>
                  <Badge variant="outline" className="px-3">Negative</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviewsLoading ? (
                  Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
                ) : reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-xl border bg-muted/30 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={review.avatarUrl} />
                            <AvatarFallback>{review.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold">{review.author}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={cn("h-3 w-3", i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted")} />
                              ))}
                              <span className="text-[10px] text-muted-foreground ml-2">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2 text-xs">
                          <Reply className="h-3 w-3" /> Reply
                        </Button>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">{review.comment}</p>
                      {review.response && (
                        <div className="ml-8 p-3 rounded-lg bg-primary/5 border-l-2 border-primary">
                          <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">Your Response</p>
                          <p className="text-sm italic">{review.response}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                    No reviews found for this location yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Customer Actions</CardTitle>
                  <CardDescription>Interactions from Google Search & Maps</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={actionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{ fill: 'transparent' }} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                        {actionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Top Discovery Keywords</CardTitle>
                  <CardDescription>What people typed to find your business</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insights?.searchTerms.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                        <span className="text-sm font-medium">{item.term}</span>
                        <Badge variant={item.growth > 0 ? 'default' : 'outline'} className={cn(item.growth > 0 ? "bg-emerald-500/10 text-emerald-600 border-none" : "")}>
                          {item.growth > 0 ? '+' : ''}{item.growth}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
function DetailStat({ title, value, icon }: { title: string, value: any, icon: React.ReactNode }) {
  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value ?? '--'}</div>
      </CardContent>
    </Card>
  );
}
function HealthItem({ label, checked, subtext }: { label: string, checked?: boolean, subtext?: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border bg-background/50">
      {checked ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-medium">{label}</span>
        {subtext && <span className="text-[10px] text-muted-foreground">{subtext}</span>}
      </div>
    </div>
  );
}
function LoadingState() {
  return (
    <AppLayout container>
      <div className="space-y-8 animate-pulse">
        <div className="h-20 w-1/3 bg-muted rounded-lg" />
        <div className="grid gap-4 md:grid-cols-4">
          {Array(4).fill(0).map((_, i) => <div key={i} className="h-24 bg-muted rounded-lg" />)}
        </div>
        <div className="h-96 w-full bg-muted rounded-lg" />
      </div>
    </AppLayout>
  );
}