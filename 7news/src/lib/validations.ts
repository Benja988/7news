import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const categoryCreateSchema = z.object({
  name: z.string().min(2).max(60),
  slug: z.string().min(2).max(80),
  description: z.string().max(200).optional(),
});

export const articleCreateSchema = z.object({
  title: z.string().min(4).max(160),
  slug: z.string().min(3).max(180),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(10),
  coverImage: z.string().url().optional(),
  categoryId: z.string().min(1),
  tags: z.array(z.string().min(1).max(30)).max(20).optional().default([]),
  status: z.enum(["draft","published"]).optional().default("draft"),
});

export const articleUpdateSchema = articleCreateSchema.partial();
export const commentCreateSchema = z.object({
  articleId: z.string().min(1),
  content: z.string().min(2).max(2000),
});
