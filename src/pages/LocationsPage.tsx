import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MoreHorizontal, MapPin, Star, Filter, ExternalLink } from 'lucide-react';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import type { Business } from '@shared/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
export function LocationsPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { data: businesses, isLoading } = useQuery<{ items: Business[] }>({
    queryKey: ['businesses'],
    queryFn: () => api<{ items: Business[] }>('/api/businesses'),
  });
  const filtered = businesses?.items.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.address.toLowerCase().includes(search.toLowerCase())
  ) || [];
  return (
    <AppLayout container>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
            <p className="text-muted-foreground">Manage and monitor your Google Business Profiles.</p>
          </div>
          <Button className="btn-gradient shadow-primary">Add New Location</Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or address..."
              className="pl-9 h-11 bg-secondary border-none shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 h-11 px-5 border-border shadow-sm">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="font-semibold text-foreground py-4">Location</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground">Rating</TableHead>
                <TableHead className="font-semibold text-foreground">Reviews</TableHead>
                <TableHead className="font-semibold text-foreground">Views (7d)</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6} className="py-8">
                      <Skeleton className="h-10 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filtered.length > 0 ? (
                filtered.map((biz) => (
                  <TableRow key={biz.id} className="hover:bg-accent/40 transition-colors group">
                    <TableCell>
                      <div className="flex flex-col">
                        <Link to={`/locations/${biz.id}`} className="font-bold hover:text-primary transition-colors flex items-center gap-1.5">
                          {biz.name}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {biz.address}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={biz.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-sm">{biz.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{biz.reviewCount.toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-sm">{biz.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => navigate(`/locations/${biz.id}`)}>
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem>Manage Reviews</DropdownMenuItem>
                          <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center text-muted-foreground italic">
                    No locations found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
function StatusBadge({ status }: { status: Business['status'] }) {
  const styles: Record<Business['status'], string> = {
    Verified: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    Pending: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    Flagged: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800",
  };
  return (
    <Badge variant="outline" className={cn("font-semibold text-[11px] px-2 py-0 h-6", styles[status])}>
      {status}
    </Badge>
  );
}