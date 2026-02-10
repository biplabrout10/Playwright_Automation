import { faker } from "@faker-js/faker";

export class RandomDataUtil {

  static getFileNumber(length: number) {
    return faker.string.alphanumeric(length);
  }

  static getIntegerAmount(min: number, max: number): string {
    return faker.number.int({ min, max }).toString();
  }



}