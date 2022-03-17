import { getAllMakesFromXMLEndpoint } from "../src/lib";

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