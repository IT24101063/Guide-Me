export interface Booking {
  id?: number;
  bookingRef: string;
  tourId: number;
  tourTitle?: string;
  touristId?: number;
  bookingDate: string; 
  guestsCount: number;
  totalAmount?: number;
  status?: string;
  qrCodeData?: string;
  createdAt?: string; 
  fullName? : string;
  email: string;
}


