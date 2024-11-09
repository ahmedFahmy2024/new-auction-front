"use client";
import { z } from "zod";

export const auctionSchema = z.object({
  titleKey: z.string().optional(),
  titleValue: z.string().optional(),
  descAfterTitle: z.string().optional(),
  rightLogoValue: z.string().optional(),
  leftLogoValue: z.string().optional(),
  leftLogoValue2: z.string().optional(),
  imageValue: z.array(z.string()).optional(),
  videoKey: z.string().optional(),
  videoValue: z.string().optional(),
  dateStart: z.date(),
  auctionStartTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please use HH:MM format (e.g., 4:30 or 16:30)",
  }),
  imageCover: z.string().optional(),
  status: z.enum(["upcoming", "ongoing", "completed"]),
});

export type auctionType = z.infer<typeof auctionSchema>;

export const priceSchema = z.object({
  _id: z.string().optional(),
  openPriceKey: z.string().optional(),
  openPriceValue: z.string().optional(),
  seekingPercentKey: z.string().optional(),
  seekingPercentValue: z.string().optional(),
  taxKey: z.string().optional(),
  taxValue: z.string().optional(),
  increaseKey: z.string().optional(),
  increaseValue: z.string().optional(),
  paddleNumKey: z.string().optional(),
  paddleNumValue: z.string().optional(),
  subTotalValue: z.string().optional(),
  totalVAlue: z.string().optional(),
});

export type priceType = z.infer<typeof priceSchema>;

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().min(1),
});

export type contactType = z.infer<typeof contactSchema>;
