import { CATEGORIES } from "../constants/categories.js";

export function randomCategory() {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

export function randomPrice() {
  const value = Math.floor(Math.random() * 50000) + 100;
  return (value / 100).toFixed(2);
}

export function randomCreatedAt() {
  const now = Date.now();
  const days365 = 365 * 24 * 60 * 60 * 1000;
  const randomPast = now - Math.floor(Math.random() * days365);
  return new Date(randomPast);
}

export function randomUpdatedAt(createdAt) {
  const created = createdAt.getTime();
  const now = Date.now();
  const randomBetween = created + Math.floor(Math.random() * (now - created + 1));
  return new Date(randomBetween);
}