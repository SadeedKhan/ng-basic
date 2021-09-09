export interface Icountry {
    countryId:number,
    countryName:string
}
export interface Istate{
    stateId:number,
    stateName:string,
    countryId:number
}
export interface Icities{
    cityid: number,
    cityName:string,
    stateId: number,
    countryId: number
}