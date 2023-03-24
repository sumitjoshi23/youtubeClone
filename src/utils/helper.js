import { faker } from "@faker-js/faker/locale/en_US";

export function generateRandomName() {
  return faker.name.firstName();
}
export function generateRandomMessage() {
  return faker.hacker.phrase().slice(0, 30);
}
