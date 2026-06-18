import { allTestimonials } from "@/lib/testimonials-data";

export type GoogleReview = {
  name: string;
  initials: string;
  color: string;
  text: string;
  stars: number;
};

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-amber-600",
  "bg-indigo-500",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }
  return name.slice(0, 2);
}

export const GOOGLE_AVERAGE_RATING = 5;
export const GOOGLE_REVIEW_TOTAL = 589;

export const GOOGLE_REVIEWS: GoogleReview[] = allTestimonials.map(
  ({ name, text, rating }, index) => ({
    name,
    initials: getInitials(name),
    color: AVATAR_COLORS[index % AVATAR_COLORS.length],
    text,
    stars: rating,
  })
);
