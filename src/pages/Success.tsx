import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../assets/consts";
import { Grid, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import PlanetSelect from "../components/PlanetSelect";
import findFalconeService, {
  Planet,
  Vehicle,
} from "../services/FindingFalconeService/FindFalconeService";
import VehicleSelect from "../components/VehicleSelect";
import { StyledContainer } from "./Home";

const Success: React.FC = () => {
  const history = useHistory();
  const [isFetched, setFetched] = useState<boolean>(false);
  const {
    state: { planetName, totalTimeTaken },
  } = useLocation();

  const handleStartAgain = () => {
    history.push({
      pathname: "/",
    });
  };

  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs>
          <HomeTitle>Finding Falcone!</HomeTitle>
        </Grid>
      </Grid>
      <SubContainer>
        <Grid container>
          <Grid item xs>
            <StyledText>
              Success! Congratulations on Finding Falcone. King Shan is mightly
              pleased.
            </StyledText>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <StyledText>Time Taken: {totalTimeTaken}</StyledText>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: "-1rem" }} container>
          <Grid item xs>
            <StyledText>Planet Found: {planetName}</StyledText>
          </Grid>
        </Grid>
      </SubContainer>
      <GridBottomContainer container>
        <Grid item xs>
          <Button variant="contained" onClick={() => handleStartAgain()}>
            Start Again
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

const SubContainer = styled.div`
  margin-top: 10rem;
  height: 20rem;
`;

const StyledText = styled.h2`
  color: ${colors.secondaryColor};
`;

const HomeTitle = styled.h1`
  color: ${colors.secondaryColor};
`;

const GridBottomContainer = styled(Grid)``;

export default Success;
