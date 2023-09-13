import { Column } from "./models/table.model";

export const APP_NAME = 'Test task for Notion';

export const DAILY_COLUMNS: Column[] = [
    { id: 0, name: 'Mo'}, 
    { id: 1, name: 'Tu'}, 
    { id: 2, name: 'We'}, 
    { id: 3, name: 'Th'}, 
    { id: 4, name: 'Fr'}, 
    { id: 5, name: 'Sa'}, 
    { id: 6, name: 'Su'}, 
];
export const HOURLY_COLUMNS: Column[] = [
    { id: 3, name: '03:00'},
    { id: 6, name: '06:00'}, 
    { id: 9, name: '09:00'},
    { id: 12, name: '12:00'},
    { id: 15, name: '15:00'},
    { id: 18, name: '18:00'},
    { id: 21, name: '21:00'},
    { id: 24, name: '24:00'},
];