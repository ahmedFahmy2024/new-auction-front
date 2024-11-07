"use client";
import { z } from "zod";

export const auctionSchema = z.object({
  titleKey: z.string().optional(),
  titleValue: z.string().optional(),
  rightLogoValue: z.string().optional(),
  leftLogoValue: z.string().optional(),
  imageValue: z.array(z.string()).optional(),
  videoKey: z.string().optional(),
  videoValue: z.string().optional(),
  dateStart: z.date(),
  imageCover: z.string().optional(),
  status: z.string().optional(),
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
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  subject: z.string().min(1),
});

export type contactType = z.infer<typeof contactSchema>;
