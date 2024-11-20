export type website = {
  _id?: string | undefined;
  project?: string | undefined;
  titleKey?: string | undefined;
  titleValue?: string | undefined;
  leftLogoValue: string;
  leftLogoValue2: string;
  rightLogoValue: string;
  imageValue: string[];
  imageCover: string;
  dateStart: string;
  videoValue?: string | undefined;
  descAfterTitle?: string | undefined;
};

export type price = {
  _id?: string | undefined;
  project?: string | undefined;
  openPriceKey?: string | undefined;
  openPriceValue?: string | undefined;
  seekingPercentKey?: string | undefined;
  seekingPercentValue?: string | undefined;
  taxKey?: string | undefined;
  taxValue?: string | undefined;
  increaseKey?: string | undefined;
  increaseValue?: string | undefined;
  paddleNumKey?: string | undefined;
  paddleNumValue?: string | undefined;
  totalVAlue?: string | undefined;
  subTotalValue?: string | undefined;
};

export type AuctionData = {
  _id: string;
  titleKey: string;
  titleValue: string;
  rightLogoValue: string;
  leftLogoValue: string;
  imageValue: string[];
  videoKey: string;
  videoValue: string;
  dateStart: string;
  imageCover: string;
  status: string;
  auctionStartTime: string;
  isPublished: boolean;
};

export type ContactData = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  file: string;
  city: string;
  dateStart: string;
  auctionStartTime: string;
  status: string;
  isPublished: boolean;
  createdAt: string;
  location: string;
};
