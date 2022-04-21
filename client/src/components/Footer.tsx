import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = (): JSX.Element => {
  return (
    <AppBar sx={{ mt: "auto" }} position="relative">
      <Container>
        <Toolbar disableGutters>
          <Typography sx={{ mx: "auto" }} variant="h6" color="inherit" noWrap>
            &#169; PostManager GraphQL - {new Date().getFullYear()}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
