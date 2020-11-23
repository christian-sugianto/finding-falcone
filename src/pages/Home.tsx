import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../assets/consts";
import { Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PlanetSelect from "../components/PlanetSelect";
import findFalconeService, {
  FindFalconeRequestBody,
  Planet,
  Vehicle,
} from "../services/FindingFalconeService/FindFalconeService";
import VehicleSelect from "../components/VehicleSelect";

const Home: React.FC = () => {
  const history = useHistory();
  const [isFetched, setFetched] = useState<boolean>(false);
  const [planetOptions, setPlanetOptions] = useState<Planet[]>([]);
  const [vehicleOptions, setVehicleOptions] = useState<Vehicle[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      destNum: 1,
    },
    {
      destNum: 2,
    },
    {
      destNum: 3,
    },
    {
      destNum: 4,
    },
  ]);
  const filteredPlanetOptions = planetOptions.filter((planetOption) => {
    for (var i = 0; i < destinations.length; i++) {
      if (planetOption.name === destinations[i].planet?.name) {
        return false;
      }
    }
    return true;
  });

  const getTotalTimeTaken = (destinations: Destination[]) => {
    let totalTime = 0;
    for (let i = 0; i < destinations.length; i++) {
      let planetDistance = destinations[i].planet?.distance;
      let vehicleSpeed = destinations[i].vehicle?.speed;
      if (planetDistance && vehicleSpeed) {
        totalTime += planetDistance / vehicleSpeed;
      }
    }
    return totalTime;
  };

  useEffect(() => {
    async function fetchData() {
      setFetched(false);
      setPlanetOptions(await findFalconeService.getPlanets());
      setVehicleOptions(await findFalconeService.getVehicles());
      setFetched(true);
    }
    fetchData();
  }, []);

  const selectPlanet = (destNum: number, planet: Planet) => {
    let newDestinations = destinations;
    newDestinations[destNum - 1] = {
      destNum,
      planet,
      vehicle: undefined,
    };
    setDestinations([...newDestinations]);
  };

  const selectVehicle = (destNum: number, vehicle?: Vehicle) => {
    let newDestinations = destinations;
    newDestinations[destNum - 1] = {
      destNum,
      planet: newDestinations[destNum - 1].planet,
      vehicle: vehicle,
    };
    setDestinations([...newDestinations]);
  };

  const findFalcone = async () => {
    let getTokenRes = await findFalconeService.getToken();
    let planet_names: string[] = [];
    let vehicle_names: string[] = [];

    for (let i = 0; i < destinations.length; i++) {
      const planet = destinations[i].planet;
      const vehicle = destinations[i].vehicle;

      planet_names.push(planet ? planet.name : "");
      vehicle_names.push(vehicle ? vehicle.name : "");
    }

    let requestBody: FindFalconeRequestBody = {
      token: getTokenRes.token,
      planet_names: planet_names,
      vehicle_names: vehicle_names,
    };

    let findFalconeRes = await findFalconeService.findFalcone(requestBody);
    return findFalconeRes;
  };

  const totalTimeTaken = getTotalTimeTaken(destinations);

  const handleFindFalcone = async () => {
    let res: any = await findFalcone();
    if (res) {
      if (res.status === "success") {
        history.push({
          pathname: "/success",
          state: {
            planetName: res.planet_name,
            totalTimeTaken: totalTimeTaken,
          },
        });

        // history.push("/success");
      } else if (res.status === "false") {
        alert("Fail to find Falcone, Please try again!");
      } else if (res.error) {
        alert(res.error);
      }
    } else {
      alert("Fail to get response from server, Please try again!");
    }
  };
  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs>
          <HomeTitle>Finding Falcone!</HomeTitle>
          <SubTitle>Select Planets you want to search in:</SubTitle>
        </Grid>
      </Grid>
      <GridSubContainer container spacing={1}>
        <Grid item xs>
          <PlanetSelect
            destNum={1}
            planetOptions={filteredPlanetOptions}
            selectPlanet={(planet: Planet) => selectPlanet(1, planet)}
          />
          {destinations[0].planet && (
            <VehicleSelect
              destNum={1}
              vehicleOptions={vehicleOptions}
              selectVehicle={(vehicle?: Vehicle) => selectVehicle(1, vehicle)}
              destinations={destinations}
            />
          )}
        </Grid>
        <Grid item xs>
          <PlanetSelect
            destNum={2}
            planetOptions={filteredPlanetOptions}
            selectPlanet={(planet: Planet) => selectPlanet(2, planet)}
          />
          {destinations[1].planet && (
            <VehicleSelect
              destNum={2}
              vehicleOptions={vehicleOptions}
              selectVehicle={(vehicle?: Vehicle) => selectVehicle(2, vehicle)}
              destinations={destinations}
            />
          )}
        </Grid>
        <Grid item xs>
          <PlanetSelect
            destNum={3}
            planetOptions={filteredPlanetOptions}
            selectPlanet={(planet: Planet) => selectPlanet(3, planet)}
          />
          {destinations[2].planet && (
            <VehicleSelect
              destNum={3}
              vehicleOptions={vehicleOptions}
              selectVehicle={(vehicle?: Vehicle) => selectVehicle(3, vehicle)}
              destinations={destinations}
            />
          )}
        </Grid>
        <Grid item xs>
          <PlanetSelect
            destNum={4}
            planetOptions={filteredPlanetOptions}
            selectPlanet={(planet: Planet) => selectPlanet(4, planet)}
          />
          {destinations[3].planet && (
            <VehicleSelect
              destNum={4}
              vehicleOptions={vehicleOptions}
              selectVehicle={(vehicle?: Vehicle) => selectVehicle(4, vehicle)}
              destinations={destinations}
            />
          )}
        </Grid>
        <Grid item xs>
          <TimeTakenContainer>Time Taken: {totalTimeTaken}</TimeTakenContainer>
        </Grid>
      </GridSubContainer>
      <GridBottomContainer container>
        <Grid item xs>
          <Button variant="contained" onClick={() => handleFindFalcone()}>
            Find Falcone
          </Button>
        </Grid>
      </GridBottomContainer>
    </StyledContainer>
  );
};

export interface Destination {
  destNum: number;
  planet?: Planet;
  vehicle?: Vehicle;
}

export const StyledContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: ${colors.primaryColor};
  text-align: center;
  flex-grow: 1;
`;

const GridSubContainer = styled(Grid)`
  padding: 0 3rem;
  height: 25rem;
  font-size: 0.75rem;
`;

const HomeTitle = styled.h1`
  color: ${colors.secondaryColor};
`;

const TimeTakenContainer = styled.h1`
  color: ${colors.secondaryColor};
  padding-top: 3.5rem;
`;

const SubTitle = styled.h2`
  display: inline-block;
  color: ${colors.secondaryColor};
  margin-right: 2rem;
`;

const GridBottomContainer = styled(Grid)``;

export default Home;
