// src/data/mockData.ts – dane przykładowe (od W06 zastąpi je API)
import type { Genre, Hall, Movie, Screening } from "./types";

// Obrazki z picsum.photos – darmowe zdjęcia generowane po „seed”
const poster = (seed: string) => `https://picsum.photos/seed/${seed}/400/600`;
const backdrop = (seed: string) => `https://picsum.photos/seed/${seed}-bg/1200/675`;

export const GENRES: Genre[] = [
  "Akcja",
  "Animacja",
  "Dramat",
  "Familijny",
  "Horror",
  "Komedia",
  "Sci-Fi",
  "Thriller",
];

export const MOVIES: Movie[] = [
  {
    id: "m1",
    title: "Ostatni Seans",
    genres: ["Dramat", "Thriller"],
    durationMin: 128,
    ageRating: "16+",
    rating: 8.4,
    posterUrl: poster("seans"),
    backdropUrl: backdrop("seans"),
    description:
      "Kinooperator z małego miasteczka odkrywa, że ostatnia taśma z archiwum skrywa tajemnicę sprzed 40 lat. Im dłużej ją ogląda, tym bardziej zaciera się granica między filmem a rzeczywistością.",
    director: "Anna Wiśniewska",
    releaseDate: "2026-10-16",
    isPremiere: true,
  },
  {
    id: "m2",
    title: "Gwiezdny Kurier",
    genres: ["Sci-Fi", "Akcja"],
    durationMin: 142,
    ageRating: "12+",
    rating: 7.9,
    posterUrl: poster("kurier"),
    backdropUrl: backdrop("kurier"),
    description:
      "Kurierka międzyplanetarna dostaje przesyłkę, której nie wolno otworzyć. Pościg przez trzy układy słoneczne zaczyna się w chwili, gdy paczka zaczyna mówić.",
    director: "Marek Zieliński",
    releaseDate: "2026-10-09",
    isPremiere: true,
  },
  {
    id: "m3",
    title: "Lis i Latarnia",
    genres: ["Animacja", "Familijny"],
    durationMin: 94,
    ageRating: "BO",
    rating: 8.1,
    posterUrl: poster("lis"),
    backdropUrl: backdrop("lis"),
    description:
      "Mały lis wyrusza nad morze, by naprawić latarnię, która od lat nie świeci. Ciepła opowieść o przyjaźni i odwadze dla całej rodziny.",
    director: "Ola Nowak",
    releaseDate: "2026-09-25",
    isPremiere: false,
  },
  {
    id: "m4",
    title: "Piąte Piętro",
    genres: ["Horror"],
    durationMin: 101,
    ageRating: "18+",
    rating: 6.8,
    posterUrl: poster("pietro"),
    backdropUrl: backdrop("pietro"),
    description:
      "W kamienicy, która ma cztery piętra, winda zatrzymuje się na piątym. Lokatorzy postanawiają sprawdzić, kto tam mieszka.",
    director: "Piotr Kamiński",
    releaseDate: "2026-10-02",
    isPremiere: false,
  },
  {
    id: "m5",
    title: "Wesele na Bis",
    genres: ["Komedia"],
    durationMin: 112,
    ageRating: "12+",
    rating: 7.2,
    posterUrl: poster("wesele"),
    backdropUrl: backdrop("wesele"),
    description:
      "Dwie rodziny, jedna sala weselna i podwójna rezerwacja na ten sam dzień. Nikt nie zamierza ustąpić.",
    director: "Katarzyna Lewandowska",
    releaseDate: "2026-09-18",
    isPremiere: false,
  },
  {
    id: "m6",
    title: "Cisza nad Tatrami",
    genres: ["Dramat"],
    durationMin: 119,
    ageRating: "12+",
    rating: 8.7,
    posterUrl: poster("tatry"),
    backdropUrl: backdrop("tatry"),
    description:
      "Ratownik TOPR po latach wraca w góry, by odnaleźć zaginionego przyjaciela. Oparte na prawdziwych wydarzeniach.",
    director: "Tomasz Wójcik",
    releaseDate: "2026-10-16",
    isPremiere: true,
  },
  {
    id: "m7",
    title: "Kod Zero",
    genres: ["Thriller", "Akcja"],
    durationMin: 133,
    ageRating: "16+",
    rating: 7.5,
    posterUrl: poster("kod"),
    backdropUrl: backdrop("kod"),
    description:
      "Programistka znajduje w systemie banku linijkę kodu, która za 48 godzin wyzeruje wszystkie konta w kraju.",
    director: "Jakub Kowalczyk",
    releaseDate: "2026-09-11",
    isPremiere: false,
  },
  {
    id: "m8",
    title: "Robo-Kumple",
    genres: ["Animacja", "Komedia", "Familijny"],
    durationMin: 88,
    ageRating: "BO",
    rating: 7.0,
    posterUrl: poster("robo"),
    backdropUrl: backdrop("robo"),
    description:
      "Dwa roboty sprzątające z centrum handlowego postanawiają zostać detektywami.",
    director: "Ewa Dąbrowska",
    releaseDate: "2026-10-09",
    isPremiere: false,
  },
];

export const HALLS: Hall[] = [
  { id: "h1", name: "Sala 1", rows: 8, seatsPerRow: 12, type: "2D", vipRows: [6, 7] },
  { id: "h2", name: "Sala 2", rows: 10, seatsPerRow: 14, type: "3D", vipRows: [8, 9] },
  { id: "h3", name: "Sala IMAX", rows: 12, seatsPerRow: 16, type: "IMAX", vipRows: [10, 11] },
  { id: "h4", name: "Sala 4DX", rows: 6, seatsPerRow: 10, type: "4DX", vipRows: [] },
];

// Seanse generujemy względem „dzisiaj”, żeby dane zawsze były aktualne
function at(dayOffset: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const SCREENINGS: Screening[] = [
  { id: "s1", movieId: "m1", hallId: "h1", startsAt: at(0, 17, 30), language: "oryginał", price: 28, takenSeats: ["C5", "C6", "D7"] },
  { id: "s2", movieId: "m2", hallId: "h3", startsAt: at(0, 19, 0), language: "napisy", price: 39, takenSeats: ["F8", "F9", "G8", "G9"] },
  { id: "s3", movieId: "m3", hallId: "h2", startsAt: at(0, 15, 15), language: "dubbing", price: 24, takenSeats: [] },
  { id: "s4", movieId: "m6", hallId: "h1", startsAt: at(0, 20, 45), language: "oryginał", price: 28, takenSeats: ["H1", "H2"] },
  { id: "s5", movieId: "m4", hallId: "h4", startsAt: at(1, 22, 0), language: "napisy", price: 45, takenSeats: ["A1"] },
  { id: "s6", movieId: "m5", hallId: "h2", startsAt: at(1, 18, 30), language: "oryginał", price: 26, takenSeats: [] },
  { id: "s7", movieId: "m8", hallId: "h1", startsAt: at(1, 12, 0), language: "dubbing", price: 22, takenSeats: ["B3"] },
  { id: "s8", movieId: "m2", hallId: "h3", startsAt: at(2, 16, 0), language: "dubbing", price: 39, takenSeats: [] },
  { id: "s9", movieId: "m7", hallId: "h2", startsAt: at(2, 21, 15), language: "napisy", price: 28, takenSeats: ["E5"] },
];

export const findMovie = (id: string) => MOVIES.find((m) => m.id === id);
export const findHall = (id: string) => HALLS.find((h) => h.id === id);
