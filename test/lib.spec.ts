import { convertXMLToJSON, getAllMakesFromXMLEndpoint } from "../src/lib";

describe("getAllMakesFromXMLEndpoint()", () => {
    test("make sure the result is not empty", async () => {
        // increase time out because we are doing a network
        // request.
        jest.setTimeout(30000);
        
        expect.assertions(1);

        const res = await getAllMakesFromXMLEndpoint();

        expect(res).not.toBeUndefined();
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

        console.log(JSON.stringify(parsed));
       
        expect(parsed).not.toBeUndefined();
    });
});