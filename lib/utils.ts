import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function isDeadlineApproaching(lastDate: string): boolean {
  try {
    const deadline = new Date(lastDate);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 5;
  } catch {
    return false;
  }
}

export function isJobExpired(lastDate: string): boolean {
  try {
    const deadline = new Date(lastDate);
    const now = new Date();
    return deadline.getTime() < now.getTime();
  } catch {
    return false;
  }
}
