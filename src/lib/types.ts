export type website = {
  _id?: string | undefined;
  project?: string | undefined;
  titleKey?: string | undefined;
  titleValue?: string | undefined;
  leftLogoValue: string;
  rightLogoValue: string;
  imageValue: string[];
  imageCover: string;
  dateStart: string;
  videoValue?: string | undefined;
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
