export interface VehicleMake {
    Make_ID: number;
    Make_Name: string;
}

export interface AllMakesXMLDecoded {
    Count: number;
    Message: string;
    Results: { AllVehicleMakes: VehicleMake[] }
}