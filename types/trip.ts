export type TripMember = { id: string; name: string; avatar: string };

export type ItineraryType = "Sightseeing" | "Dining" | "Café" | "Architecture" | "Shopping" | "Transit" | "Stay" | "To-Do";
export type ItineraryStatus = "Idea" | "Planned" | "Booked" | "Done" | "Skip";

export type ItineraryItem = {
  id: string;
  name: string;
  date: string;
  time: string;
  type: ItineraryType;
  location?: string;
  mapUrl?: string;
  status: ItineraryStatus;
  note?: string;
  createdBy: string;
  updatedBy: string;
};

export type PaymentCategory = "Food" | "Café" | "Transport" | "Ticket" | "Hotel" | "Shopping" | "Other";

export type Payment = {
  id: string;
  title: string;
  date: string;
  amount: number;
  currency: string;
  paidBy: string;
  participants: string[];
  category: PaymentCategory;
  note?: string;
  createdBy: string;
};

export type TripData = {
  shareId: string;
  name: string;
  startDate: string;
  endDate: string;
  members: TripMember[];
  itineraries: ItineraryItem[];
  payments: Payment[];
};
