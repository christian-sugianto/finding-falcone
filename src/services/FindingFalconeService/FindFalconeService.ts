import fetch from "node-fetch";
const BASE_URL = "https://findfalcone.herokuapp.com";

class FindFalconeService {
  getPlanets = async () => {
    const res = await fetch(BASE_URL + "/planets");
    return res.json();
  };

  getVehicles = async () => {
    const res = await fetch(BASE_URL + "/vehicles");
    return res.json();
  };

  getToken = async () => {
    const requestOptions = {
      method: "POST",
      headers: { Accept: "application/json" },
    };

    const res = await fetch(BASE_URL + "/token", requestOptions);
    return res.json();
  };

  findFalcone = async (body: FindFalconeRequestBody) => {
    const requestOptions = {
      method: "POST",
      headers: { Accept: "application/json" },
      body: JSON.stringify(body),
    };

    const res = await fetch(BASE_URL + "/find", requestOptions);
    return res.json();
  };
}

export interface Planet {
  name: string;
  distance: number;
}

export interface Vehicle {
  name: string;
  total_no: number;
  max_distance: number;
  speed: number;
}

export interface FindFalconeRequestBody {
  token: string;
  planet_names: string[];
  vehicle_names: string[];
}

const findFalconeService = new FindFalconeService();
export default findFalconeService;
