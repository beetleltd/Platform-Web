import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateSignature(payload, timestamp) {
  const encoder = new TextEncoder();

  // Combine payload and timestamp
  const data = JSON.stringify(payload) + timestamp;

  // Convert secret to CryptoKey
  const key = await crypto.subtle.importKey(
    "raw", // The raw key format
    encoder.encode(import.meta.env.VITE_ORDER_SECRET_KEY), // Encode the secret as ArrayBuffer
    { name: "HMAC", hash: { name: "SHA-256" } }, // Algorithm details
    false, // Not extractable
    ["sign"] // Usable for signing
  );

  // Sign the data
  const signature = await crypto.subtle.sign(
    "HMAC", // Algorithm name
    key, // The CryptoKey
    encoder.encode(data) // Data to sign
  );

  // Convert the signature to a hex string
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
