export interface Tour {
  id: number;
  title: string;
  description?: string;
  price?: number;
  durationDays?: number;
  startDate: string;
  location: string;
}
