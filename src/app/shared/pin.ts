export interface Pin{
    id?:number;
    userId?:string;
    name?:string;
    type?:string;
    latitude:string;
    longitude:string;
    description:string;
    image3d?:string;
}

export class Pin implements Pin{
    constructor(){

    }
}