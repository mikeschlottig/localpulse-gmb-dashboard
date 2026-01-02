import { Hono } from "hono";
import type { Env } from './core-utils';
import { BusinessEntity, UserEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import type { BusinessStats } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // BUSINESSES
  app.get('/api/businesses', async (c) => {
    await BusinessEntity.ensureSeed(c.env);
    const cursor = c.req.query('cursor');
    const limit = c.req.query('limit');
    const page = await BusinessEntity.list(c.env, cursor ?? null, limit ? Number(limit) : 50);
    return ok(c, page);
  });
  app.get('/api/businesses/:id', async (c) => {
    const id = c.req.param('id');
    const entity = new BusinessEntity(c.env, id);
    if (!await entity.exists()) return notFound(c, 'Business not found');
    return ok(c, await entity.getState());
  });
  // DASHBOARD STATS
  app.get('/api/dashboard/stats', async (c) => {
    await BusinessEntity.ensureSeed(c.env);
    const { items } = await BusinessEntity.list(c.env, null, 100);
    const stats: BusinessStats = {
      totalLocations: items.length,
      averageRating: items.reduce((acc, b) => acc + b.rating, 0) / (items.length || 1),
      totalReviews: items.reduce((acc, b) => acc + b.reviewCount, 0),
      totalViews: items.reduce((acc, b) => acc + b.views, 0),
      ratingGrowth: 0.2, // Mock growth values
      reviewGrowth: 15,
    };
    return ok(c, stats);
  });
  // USERS (Simplified for Phase 1)
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    return ok(c, await UserEntity.list(c.env));
  });
}