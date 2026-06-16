import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Deterministic pseudo-random in [0,1) from a string seed — keeps mock data stable. */
export function seeded(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // xorshift mix
  h ^= h << 13;
  h ^= h >>> 17;
  h ^= h << 5;
  return ((h >>> 0) % 100000) / 100000;
}

export function pick<T>(arr: T[], seed: string): T {
  return arr[Math.floor(seeded(seed) * arr.length)];
}

const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export function monthLabel(year: number, month: number): string {
  return `${MONTHS_ES[month]} ${year}`;
}

export const DOW_ES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
export const DOW_ES_SHORT = ["L", "M", "M", "J", "V", "S", "D"];
