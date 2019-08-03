export interface Room {
  id: string;
}

export interface AudioSegment {
  roomId: string;
  data: string;
  timestamp: string;
  userId: string;
}
