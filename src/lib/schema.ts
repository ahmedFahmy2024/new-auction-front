"use client";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().min(1),
});

export type contactType = z.infer<typeof contactSchema>;

export const projectSchema = z.object({
  _id: z.string().optional(),
  title: z.string().optional(),
  city: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  imageCover: z.string().optional(),
  file: z.union([z.string(), z.instanceof(File)]).optional(),
  images: z.array(z.string()).optional(),
  dateStart: z.date(),
  auctionStartTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please use HH:MM format (e.g., 4:30 or 16:30)",
  }),
  status: z.enum(["upcoming", "ongoing", "completed"]).optional(),
  isPublished: z.boolean().optional(),
});

export type projectType = z.infer<typeof projectSchema>;

export const newpriceSchema = z.object({
  _id: z.string().optional(),
  openPrice: z.string().optional(),
  increase: z.string().optional(),
  soldPrice: z.string().optional(),
  paddleNum: z.string().optional(),
  seekingPercent: z.string().optional(),
  taxPercent: z.string().optional(),
  total: z.string().optional(),
});

export type newpriceType = z.infer<typeof newpriceSchema>;

export const auctionSchema = z.object({
  _id: z.string().optional(),
  auctionName: z.string().optional(),
  logoOne: z.string().optional(),
  logoSecond: z.string().optional(),
  logoThird: z.string().optional(),
  imageCover: z.string().optional(),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  bgColor: z.string().optional(),
  textColor: z.string().optional(),
  notesColor: z.string().optional(),
  textBgColor1: z.string().optional(),
  textBgColor2: z.string().optional(),
  textBgColor3: z.string().optional(),
  openPrice: z.string().optional(),
  seekingPercent: z.string().optional(),
  taxPercent: z.string().optional(),
  areaPrice: z.string().optional(),
  area: z.string().optional(),
  notes1: z.string().optional(),
  notes2: z.string().optional(),
  increase: z.string().optional(),
  isRunning: z.boolean().optional(),
  displayLogoOne: z.boolean().optional(),
  displayLogoSecond: z.boolean().optional(),
  displayLogoThird: z.boolean().optional(),
  displayOpenPrice: z.string().optional(),
  displaySeekingPercent: z.string().optional(),
  displayTaxPercent: z.string().optional(),
  displayAreaPrice: z.string().optional(),
  displayArea: z.string().optional(),
  displayNotes1: z.string().optional(),
  displayNotes2: z.string().optional(),
  displayIncrease: z.string().optional(),
  displayVideoUrl: z
    .boolean()
    .or(z.string().transform((val) => val === "true")),
  bgImage: z.string().optional(),
  displayBgImage: z.string().optional(),
});

export type auctionType = z.infer<typeof auctionSchema>;

export const priceSchema = z.object({
  _id: z.string().optional(),
  increase: z.string().optional(),
  soldPrice: z.string().optional(),
  paddleNum: z.string().optional(),
  total: z.string().optional(),
  openPrice: z.string().optional(),
  areaPrice: z.string().optional(),
});

export type priceType = z.infer<typeof priceSchema>;
