import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const popoverSameWidth = {
	width: "var(--radix-popover-trigger-width)",
	maxHeight: "var(--radix-popover-content-available-height)",
};
