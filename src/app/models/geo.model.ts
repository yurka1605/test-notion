export interface HttpCityGeoResponse {
    name: string;
    local_names: Array<{[key: string]: string}>;
    country: string;
    lat: number;
    lon: number;
    state?: string;
}