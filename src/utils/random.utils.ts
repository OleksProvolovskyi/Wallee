export class RandomUtils {

    public static getRandomElementFromList<T>(array: T[]): T {       
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}