type SmsResponseListItem = {
  messageChannelTypeId: number;
  messageTypeId: number;
  content: string;
  languageCode: string;
  isActive: boolean;
  startDateTime: string; // or Date if you parse it
  endDateTime: string | null;
  concurrencyStamp: string;
  isDeleted: boolean;
  deleterId: string | null;
  deletionTime: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  creationTime: string;
  creatorId: string | null;
  id: number;
};

export type SmsListApiResponse = {
  responseStatusCode: number;
  responseMessage: string;
  responseList: SmsResponseListItem[];
};
