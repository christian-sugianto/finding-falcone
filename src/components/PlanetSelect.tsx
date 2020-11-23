import React from "react";
import styled from "styled-components";
import colors from "../assets/consts";
import { withStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Planet } from "../services/FindingFalconeService/FindFalconeService";

interface Props {
  destNum: number;
  planetOptions?: Planet[];
  selectPlanet: (planet?: Planet) => void;
}

const PlanetSelect: React.FC<Props> = ({
  destNum,
  planetOptions,
  selectPlanet,
}) => {
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (planetOptions) {
      if (e.target.value === "") {
        selectPlanet(undefined);
      }
      for (var i = 0; i < planetOptions.length; i++) {
        if (planetOptions[i].name === e.target.value) {
          selectPlanet(planetOptions[i]);
        }
      }
    }
  };

  return (
    <div>
      <Title>Destination {destNum}</Title>
      <Autocomplete
        options={planetOptions ? planetOptions : []}
        getOptionLabel={(option: Planet) => option.name}
        getOptionSelected={(option, value) => option.name === value.name}
        renderInput={(params: any) => (
          <CssTextField
            {...params}
            label={
              planetOptions ? "Please type or select" : "Loading options..."
            }
            color="secondary"
            variant="outlined"
            onSelect={handleSelect}
          />
        )}
      />
    </div>
  );
};

const Title = styled.h1`
  color: ${colors.secondaryColor};
`;

const CssTextField = withStyles({
  root: {
    "background-color": colors.tertiaryColor,
    "border-radius": "0.3rem",
    "& label.Mui-focused": {
      color: colors.secondaryColor,
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: colors.secondaryColor,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.secondaryColor,
      },
    },
  },
})(TextField);

export default PlanetSelect;
