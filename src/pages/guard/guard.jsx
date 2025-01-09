import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Guard() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <Box className="parent_sec">
          <Card className="child_sec">
            <CardContent>
              <Typography variant="h5" component="h2">
                Host page
              </Typography>
              <Typography variant="body2" component="p">
                This is a page for host app.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </React.Fragment>
  );
}
