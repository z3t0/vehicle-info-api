import { default as axios } from "axios";
import { XMLParser } from "fast-xml-parser"
import { AllMakesXMLDecoded, ExpectedOutputSingle, VehicleMake, VehicleTypesForMakeID, VehicleTypesForMakeResponse } from "./interfaces";

function convertXMLToJSON(xmlData: string): any {
    const parser = new XMLParser();

    return parser.parse(xmlData);
}

async function getAllMakesFromXMLEndpoint(): Promise<AllMakesXMLDecoded> {
    // TODO: cleanup var naming;
    const URL = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML";

    const res = await axios.get(URL);

    const decoded = convertXMLToJSON(res.data);
    const response = decoded.Response as AllMakesXMLDecoded;

    return response;
}


async function getVehicleTypesForMake(makeID: number): Promise<VehicleTypesForMakeResponse> {
    const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeID}?format=xml`

    const res = await axios.get(URL);

    const decoded = convertXMLToJSON(res.data);
    const response = decoded.Response as VehicleTypesForMakeResponse;

    return response;
}

function aggregateVehicleInformation(vehicleMake: VehicleMake,
                                     vehicleTypes: VehicleTypesForMakeID[]): ExpectedOutputSingle {

    // format vehicleTypes into expected keys.
    const formattedVehicleTypes =
        vehicleTypes.map((vehicleType: VehicleTypesForMakeID) => ({
            typeId: vehicleType.VehicleTypeId,
            typeName: vehicleType.VehicleTypeName
        }));

    return {
        makeId: vehicleMake.Make_ID,
        makeName: vehicleMake.Make_Name,
        vehicleTypes: formattedVehicleTypes
    }

}


export {
    // Library.
    getAllMakesFromXMLEndpoint,
    getVehicleTypesForMake,
    aggregateVehicleInformation,

    // Utility.
    convertXMLToJSON
};