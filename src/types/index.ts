export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "USER" | "ADMIN";
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  color: string;
  active: boolean;
}

export interface Booking {
  id: string;
  startTime: Date;
  endTime: Date;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  notes: string | null;
  client: User;
  service: Service;
}

export interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}
