import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function ColorButtons({
  eacnum,
  handleClick,
  gameWon,
  startGame,
}) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant={eacnum.hold ? "contained" : "contained"}
        color={eacnum.hold ? "success" : "primary"}
        onClick={() => handleClick(eacnum)}
        style={{ fontSize: "20px", width: "30px", height: "60px" }}
        disabled={gameWon || !startGame ? true : false}
      >
        {eacnum.number}
      </Button>
    </Stack>
  );
}
