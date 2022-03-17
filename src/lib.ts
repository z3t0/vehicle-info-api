import { default as axios } from "axios";
import { XMLParser } from "fast-xml-parser"

async function getAllMakesFromXMLEndpoint() {
    const URL = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML";

    const res = await axios.get(URL);

    return res.data;
}

function convertXMLToJSON(xmlData: string): any {
    const parser = new XMLParser();

    return parser.parse(xmlData);
}

export { getAllMakesFromXMLEndpoint, convertXMLToJSON };