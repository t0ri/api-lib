declare var fetching: any;
interface Options {
    apiKey: string;
    zip: number;
    units?: string;
}
interface Air {
    humidity: number;
    pressure: number;
}
interface Type {
    description: string;
    detailedDescription: string;
}
interface Wind {
    direction: string;
    speed: number;
}
interface Location {
    city: string;
    country: string;
    timezone: number;
}
interface Temp {
    current: number;
    min: number;
    max: number;
}
interface Sun {
    rise: string;
    set: string;
}
declare class Weather {
    zip: number;
    apiKey: string;
    units: string;
    clouds: string;
    sun: object;
    location: object;
    temp: object;
    air: object;
    type: object;
    wind: object;
    constructor(options?: Options);
    get path(): string;
    getData(): Promise<any>;
    handleData(data: any): void;
    degToDirection(deg: number): "N" | "NW" | "W" | "SW" | "S" | "SE" | "E" | "NE";
    timestampToString(unixTimestamp: number): string;
}
declare const weather: Weather;