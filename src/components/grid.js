import * as React from "react";
import Grid from "@mui/material/Grid";
import ColorButtons from "./gridbuttons";

function Gridtenz({ gameNums, handleClick, gameWon, startGame }) {
  return (
    <>
      <Grid container spacing={3}>
        {gameNums.map((eacnum) => (
          <Grid item xs={2.2} key={eacnum.id}>
            <ColorButtons
              eacnum={eacnum}
              handleClick={handleClick}
              gameWon={gameWon}
              startGame={startGame}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Gridtenz;
