import { default as axios } from "axios";
import { XMLParser } from "fast-xml-parser"
import { AllMakesXMLDecoded, ExpectedOutput, ExpectedOutputSingle, VehicleMake, VehicleTypesForMakeID, VehicleTypesForMakeResponse } from "./interfaces";

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

async function fetchAndGenerateAggregateForAllVehicles() :
Promise <ExpectedOutput> {
    console.log("getting makes");
    const makesInfo = await getAllMakesFromXMLEndpoint();

    const makes = makesInfo.Results.AllVehicleMakes;

    // TODO: use Promises.all for scaling
    // TODO: consider request throttling to prevent
    //       DDOS or overloading the network.

    console.log("processing makes");

    // TODO: remove the limitedMakes, it should process all
    //       the makes
    const limitedMakes = makes.slice(0,3);

    const expectedOutput = limitedMakes.map(async (make) => {
        // Fetch vehicle types for make.
        console.log("fetching vehicle types");
        const vehicleTypes = await getVehicleTypesForMake(make.Make_ID);


        console.log("aggregating");
        const aggregate =  aggregateVehicleInformation(
            make,
            vehicleTypes.Results.VehicleTypesForMakeIds);

        console.log("promise resolved for make=" + make.Make_ID);

        return aggregate;
    })

    console.log("before promise all resolved");
    const res = Promise.all(expectedOutput);
    console.log("promise all resolved");

    return res;
}


export {
    // Library.
    getAllMakesFromXMLEndpoint,
    getVehicleTypesForMake,
    aggregateVehicleInformation,

    // API.
    fetchAndGenerateAggregateForAllVehicles,

    // Utility.
    convertXMLToJSON
};