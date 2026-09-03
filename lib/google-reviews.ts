import { allTestimonials } from "@/lib/testimonials-data";

export type GoogleReview = {
  name: string;
  initials: string;
  color: string;
  text: string;
  stars: number;
};

/* גוונים כהים (700) כדי שראשי התיבות בלבן יעמדו ביחס ניגודיות 4.5:1 */
const AVATAR_COLORS = [
  "bg-blue-700",
  "bg-purple-700",
  "bg-orange-700",
  "bg-emerald-700",
  "bg-rose-700",
  "bg-cyan-700",
  "bg-amber-700",
  "bg-indigo-700",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }
  return name.slice(0, 2);
}

export const GOOGLE_REVIEWS: GoogleReview[] = allTestimonials.map(
  ({ name, text, rating }, index) => ({
    name,
    initials: getInitials(name),
    color: AVATAR_COLORS[index % AVATAR_COLORS.length],
    text,
    stars: rating,
  })
);
