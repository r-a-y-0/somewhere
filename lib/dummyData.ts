import { TripData } from "@/types/trip";

export const dummyTrip: TripData = {
  shareId: "syd-mel-2026",
  name: "Sydney & Melbourne 2026",
  startDate: "2026-04-10",
  endDate: "2026-04-16",
  members: [
    { id: "rika", name: "Rika", avatar: "R" },
    { id: "mom", name: "Mom", avatar: "M" }
  ],
  itineraries: [
    { id: "1", name: "Circular Quay", date: "2026-04-10", time: "09:00", type: "Sightseeing", status: "Planned", location: "Sydney", mapUrl: "https://maps.google.com", createdBy: "Rika", updatedBy: "Rika" },
    { id: "2", name: "AP Bakery", date: "2026-04-10", time: "11:00", type: "Café", status: "Idea", createdBy: "Rika", updatedBy: "Rika" },
    { id: "3", name: "Bondi Beach", date: "2026-04-11", time: "10:30", type: "Sightseeing", status: "Planned", createdBy: "Mom", updatedBy: "Mom" },
    { id: "4", name: "Pellegrino 2000", date: "2026-04-11", time: "19:00", type: "Dining", status: "Booked", createdBy: "Rika", updatedBy: "Rika" },
    { id: "5", name: "Taronga Zoo", date: "2026-04-12", time: "09:30", type: "Sightseeing", status: "Planned", createdBy: "Mom", updatedBy: "Mom" },
    { id: "6", name: "Fitzroy Walk", date: "2026-04-14", time: "08:30", type: "Architecture", status: "Idea", createdBy: "Rika", updatedBy: "Rika" },
    { id: "7", name: "NGV", date: "2026-04-14", time: "14:00", type: "Sightseeing", status: "Planned", createdBy: "Mom", updatedBy: "Mom" },
    { id: "8", name: "Architecture Walk", date: "2026-04-15", time: "10:00", type: "Architecture", status: "Idea", createdBy: "Rika", updatedBy: "Rika" }
  ],
  payments: [
    { id: "p1", title: "Coffee", date: "2026-04-10", amount: 18, currency: "AUD", paidBy: "Rika", participants: ["Rika", "Mom"], category: "Café", createdBy: "Rika" },
    { id: "p2", title: "Dinner", date: "2026-04-11", amount: 120, currency: "AUD", paidBy: "Mom", participants: ["Rika", "Mom"], category: "Food", createdBy: "Mom" },
    { id: "p3", title: "Train", date: "2026-04-12", amount: 12, currency: "AUD", paidBy: "Rika", participants: ["Rika", "Mom"], category: "Transport", createdBy: "Rika" },
    { id: "p4", title: "Museum Ticket", date: "2026-04-14", amount: 60, currency: "AUD", paidBy: "Rika", participants: ["Rika", "Mom"], category: "Ticket", createdBy: "Rika" }
  ]
};
