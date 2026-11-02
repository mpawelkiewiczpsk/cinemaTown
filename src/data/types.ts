// src/data/types.ts – modele domenowe aplikacji
export type AgeRating = "BO" | "7+" | "12+" | "16+" | "18+";
export type Genre =
  "Akcja" | "Animacja" | "Dramat" | "Familijny" | "Horror" | "Komedia" | "Sci-Fi" | "Thriller";

export type Movie = {
  id: string;
  title: string;
  genres: Genre[];
  durationMin: number;
  ageRating: AgeRating;
  rating: number; // 0–10
  posterUrl: string;
  backdropUrl: string;
  description: string;
  director: string;
  releaseDate: string; // ISO, np. "2026-10-17"
  isPremiere: boolean;
};

export type HallType = "2D" | "3D" | "IMAX" | "4DX";

export type Hall = {
  id: string;
  name: string;
  rows: number;
  seatsPerRow: number;
  type: HallType;
  vipRows: number[]; // indeksy rzędów VIP (0 = pierwszy rząd)
};

export type ScreeningLanguage = "dubbing" | "napisy" | "oryginał";

export type Screening = {
  id: string;
  movieId: string;
  hallId: string;
  startsAt: string; // ISO
  language: ScreeningLanguage;
  price: number; // PLN
  takenSeats: string[]; // np. ["A5", "A6"]
};
