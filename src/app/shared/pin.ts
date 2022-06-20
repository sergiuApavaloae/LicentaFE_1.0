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

export enum ReportType{
    Streets="Streets",
    Salubrity="Salubrity",
    Parks="Parks",
    Traffic="Traffic",
    Beautiful="Beautiful",
    Animals="Animals",
    Other="Other"
}
export class Pin implements Pin{
    constructor(){

    }
}