// TODO: more consistent var naming

// All Makes Endpoint
export interface VehicleMake {
    Make_ID: number;
    Make_Name: string;
}

export interface AllMakesXMLDecoded {
    Count: number;
    Message: string;
    Results: { AllVehicleMakes: VehicleMake[] }
}

export interface VehicleTypesForMakeID {
    // Note: The Endpoint uses 'Id' instead of "ID", as is done
    //       in the rest of this codebase.
    VehicleTypeId: number
    VehicleTypeName: string;
}

// Vehicle Types for Make Endpoint
export interface VehicleTypesForMakeResponse {
    Count: number;
    Message: string;
    SearchCriteria: string;
    Results: {
        // Note: The Endpoint uses 'Id' instead of "ID", as is done
        //       in the rest of this codebase.
        VehicleTypesForMakeIds: VehicleTypesForMakeID[];
    }
}

export interface ExpectedOutputVehicleType {
    typeId: number;
    typeName: string;
}

// TODO: find a better name for this type.
export interface ExpectedOutputSingle {
    makeId: number;
    makeName: string;
    vehicleTypes: ExpectedOutputVehicleType[]
}

export type ExpectedOutput = ExpectedOutputSingle[];