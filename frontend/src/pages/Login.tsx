import { Box } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="robot" style={{ width: "400px" }} />
      </Box>
      <Box></Box>
    </Box>
  );
};

export default Login;
