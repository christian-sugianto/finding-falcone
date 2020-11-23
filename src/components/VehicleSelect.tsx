import React from "react";
import styled from "styled-components";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Vehicle } from "../services/FindingFalconeService/FindFalconeService";
import { Destination } from "../pages/Home";

interface Props {
  destNum: number;
  vehicleOptions: Vehicle[];
  selectVehicle: (vehicle?: Vehicle) => void;
  destinations: Destination[];
}

const VehicleSelect: React.FC<Props> = ({
  destNum,
  vehicleOptions,
  selectVehicle,
  destinations,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (vehicleOptions) {
      if (!e.target.checked) {
        selectVehicle(undefined);
      } else {
        for (var i = 0; i < vehicleOptions.length; i++) {
          if (vehicleOptions[i].name === e.target.name) {
            selectVehicle(vehicleOptions[i]);
          }
        }
      }
    }
  };

  const getAvailableNumOfVehicle = (vehicle: Vehicle) => {
    let numOfVehicle = 0;
    for (var i = 0; i < destinations.length; i++) {
      if (destinations[i].vehicle?.name === vehicle.name) {
        numOfVehicle += 1;
      }
    }
    return vehicle.total_no - numOfVehicle;
  };

  const getVehicleLabel = (vehicle: Vehicle) => {
    return `${vehicle.name} (${getAvailableNumOfVehicle(vehicle)})`;
  };

  const isVehicleDisabled = (vehicle: Vehicle) => {
    const planet = destinations[destNum - 1].planet;
    if (
      (planet && planet.distance > vehicle.max_distance) ||
      (destinations[destNum - 1].vehicle?.name !== vehicle.name &&
        getAvailableNumOfVehicle(vehicle) <= 0)
    ) {
      return true;
    }
    return false;
  };

  const destVehicle = destinations[destNum - 1].vehicle;

  return (
    <Container>
      {vehicleOptions.map((vehicle, index) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                key={index}
                checked={
                  destVehicle ? destVehicle.name === vehicle.name : false
                }
                disabled={isVehicleDisabled(vehicle)}
                onChange={handleChange}
                color="primary"
                name={vehicle.name}
              />
            }
            label={getVehicleLabel(vehicle)}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  text-align: left;
  padding-left: 0.5rem;
`;

export default VehicleSelect;
