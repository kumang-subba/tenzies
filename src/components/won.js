import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function WonAlert() {
  return (
    <Stack sx={{ width: "50%" }} spacing={2}>
      <Alert severity="success" style={{ justifyContent: "center" }}>
        <AlertTitle>You won</AlertTitle>
        <strong>Hit reset to play again</strong>
      </Alert>
    </Stack>
  );
}
