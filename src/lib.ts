import { default as axios } from "axios";

async function getAllMakesFromXMLEndpoint() {
    const URL = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML";

    const res = await axios.get(URL);

    return res.data;
}

export { getAllMakesFromXMLEndpoint };