import findFalconeService, {
  FindFalconeRequestBody,
} from "./FindFalconeService";

describe("GET /planets - FindFalcone API", () => {
  it("should return a list of planets", async () => {
    const data = await findFalconeService.getPlanets();
    expect(data).toEqual([
      { name: "Donlon", distance: 100 },
      { name: "Enchai", distance: 200 },
      { name: "Jebing", distance: 300 },
      { name: "Sapir", distance: 400 },
      { name: "Lerbin", distance: 500 },
      { name: "Pingasor", distance: 600 },
    ]);
  });
});

describe("GET /vehicles - FindFalcone API", () => {
  it("should return a list of vehicles", async () => {
    const data = await findFalconeService.getVehicles();
    expect(data).toEqual([
      { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 },
      { name: "Space rocket", total_no: 1, max_distance: 300, speed: 4 },
      { name: "Space shuttle", total_no: 1, max_distance: 400, speed: 5 },
      { name: "Space ship", total_no: 2, max_distance: 600, speed: 10 },
    ]);
  });
});

describe("POST /token - FindFalcone API", () => {
  it("should return a token", async () => {
    const data = await findFalconeService.getToken();
    expect(data.token.length > 0).toBe(true);
  });
});

describe("POST /find - FindFalcone API - no token", () => {
  it("should return error", async () => {
    let planet_names: string[] = ["Donlon", "Enchai", "Pingasor", "Sapir"];
    let vehicle_names: string[] = [
      "Space pod",
      "Space pod",
      "Space rocket",
      "Space rocket",
    ];

    let requestBody: FindFalconeRequestBody = {
      token: "",
      planet_names: planet_names,
      vehicle_names: vehicle_names,
    };
    const data = await findFalconeService.findFalcone(requestBody);
    expect(data.error).toBe(
      "Token not initialized. Please get a new token with the /token API"
    );
  });
});

describe("POST /find - FindFalcone API - success/failure response", () => {
  it("should return success/failure response", async () => {
    const tokenData = await findFalconeService.getToken();
    let planet_names: string[] = ["Donlon", "Enchai", "Pingasor", "Sapir"];
    let vehicle_names: string[] = [
      "Space pod",
      "Space pod",
      "Space rocket",
      "Space rocket",
    ];

    let requestBody: FindFalconeRequestBody = {
      token: tokenData.token,
      planet_names: planet_names,
      vehicle_names: vehicle_names,
    };
    const data = await findFalconeService.findFalcone(requestBody);
    expect(data.status === "success" || data.status === "false").toBe(true);
  });
});
