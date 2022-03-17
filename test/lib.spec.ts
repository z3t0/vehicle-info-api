import { VehicleMake, VehicleTypesForMakeID } from "../src/interfaces";
import { aggregateVehicleInformation, convertXMLToJSON, getAllMakesFromXMLEndpoint, getVehicleTypesForMake } from "../src/lib";

describe("getAllMakesFromXMLEndpoint()", () => {
    test("make sure the result is not empty", async () => {
        // increase time out because we are doing a network
        // request.
        jest.setTimeout(30000);
        
        expect.assertions(1);

        const res = await getAllMakesFromXMLEndpoint();

        expect(res).not.toBeUndefined();
    });

    test("make sure the result conforms to the expected format", async () => {
        // increase time out because we are doing a network
        // request.
        jest.setTimeout(30000);
        
        expect.assertions(8);

        const res = await getAllMakesFromXMLEndpoint();

        expect(res).not.toBeUndefined();
        expect(res.Count).not.toBeUndefined();
        expect(res.Count).toBeGreaterThan(0);
        expect(res.Results).not.toBeUndefined();
        expect(res.Results.AllVehicleMakes).not.toBeUndefined();
        expect(Array.isArray(res.Results.AllVehicleMakes))
            .toBeTruthy();

        // Check one of the items
        const item = res.Results.AllVehicleMakes[0];
        expect (typeof (item.Make_ID)).toBe('number');
        expect (typeof (item.Make_Name)).toBe('string');
    });
});

describe("convertXMLToJSON", () => {
    test("parse sample data", () => {

        // Sample data is taken from the second API.
        // TODO: move to constants file.
        const sampleData = `<?xml version="1.0" encoding="UTF-8"?>
<Response xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<Count>10069</Count>
<Message>Response returned successfully</Message>
<Results>
<AllVehicleMakes>
<Make_ID>440</Make_ID>
<Make_Name>ASTON MARTIN</Make_Name>
</AllVehicleMakes>
</Results>
</Response>`;
        

        const parsed = convertXMLToJSON(sampleData);
       
        expect(parsed).not.toBeUndefined();
    });
});

describe("getVehicleTypesForMake", () => {
    test("ensure the format is as expected", async () => {

        expect.assertions(9);

        const makeID = 440;

        const res = await getVehicleTypesForMake(makeID);

        expect(res).not.toBeUndefined();
        expect(res.Count).not.toBeUndefined();
        expect(res.Count).toBeGreaterThan(0);
        expect(res.SearchCriteria).not.toBeUndefined();
        expect(res.Results).not.toBeUndefined();
        expect(res.Results.VehicleTypesForMakeIds).not.toBeUndefined();

        expect(Array.isArray(res.Results.VehicleTypesForMakeIds))
            .toBeTruthy()

        // Check one of the items
        const item = res.Results.VehicleTypesForMakeIds[0];

        expect(typeof(item.VehicleTypeId)).toBe('number');
        expect(typeof(item.VehicleTypeName)).toBe('string');
    });

});


describe("aggregateVehicleInformation()", () => {
    test("with sample input, ensure output is as expected", () => {

        // TODO: move sample data to constants file
        const vehicleMake: VehicleMake = {
            Make_ID: 440,
            Make_Name: "ASTON MARTIN"
        }

        const vehicleTypes: VehicleTypesForMakeID[] = [
            {
                VehicleTypeId: 2,
                VehicleTypeName: "Passenger Car"
            },

            {
                VehicleTypeId: 7,
                VehicleTypeName: "Multipurpose Passenger Vehicle (MPV)"
            }
        ]

        const aggregate =
            aggregateVehicleInformation(vehicleMake, vehicleTypes);

        expect(aggregate).not.toBeUndefined();
        expect(typeof(aggregate.makeId)).toBe('number');
        expect(typeof(aggregate.makeName)).toBe('string');

        // Note: We can add more extensive validation if desired.
        //       However, this should suffice as we are generating
        //       the data, rather than consuming from an uncontrolled
        //       external endpoint.
        expect(Array.isArray(aggregate.vehicleTypes)).toBeTruthy();

    });
});