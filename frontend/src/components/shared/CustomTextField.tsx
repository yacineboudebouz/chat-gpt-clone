import React from "react";
import { TextField } from "@mui/material";
type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomTextField = (props: Props) => {
  return (
    <TextField
      margin="normal"
      name={props.name}
      type={props.type}
      label={props.label}
      InputLabelProps={{ style: { color: "white" } }}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
    />
  );
};

export default CustomTextField;
