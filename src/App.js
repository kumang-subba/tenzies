import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Gridtenz from "./components/grid";
import Button from "@mui/material/Button";
import WonAlert from "./components/won";
import { Typography } from "@mui/material";
import Confetti from "react-confetti";
import Chip from "@mui/material/Chip";

function App() {
  const [gameNums, setGameNums] = useState(gameArray());
  const [gameWon, setGameWon] = useState(false);
  const [numberOfRolls, setNumberOfRolls] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return JSON.parse(localStorage.getItem("highscore")) || "";
  });
  const [currentScore, setCurrenscore] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [gameTime, setGameTime] = useState("");
  const [timeScore, setTimeScore] = useState(() => {
    return JSON.parse(localStorage.getItem("timer")) || "";
  });

  useEffect(() => {
    if (currentScore && (!highScore || highScore > currentScore)) {
      setHighScore(currentScore);
      localStorage.setItem("highscore", JSON.stringify(currentScore));
    }

    if (gameTime && (!timeScore || timeScore > gameTime)) {
      setTimeScore(gameTime);
      localStorage.setItem("timer", JSON.stringify(gameTime));
    }
  }, [currentScore, highScore, gameTime, timeScore]);
  useEffect(() => {
    if (gameNums.every((el, ind, arr) => el.number === arr[0].number)) {
      setCurrenscore(numberOfRolls);
      setGameTime(time);
      setGameWon(true);
      setStartTimer(false);
    }
  }, [gameNums, numberOfRolls, time]);
  const handleClick = (num) => {
    setGameNums((prev) =>
      prev.map((i) => {
        return i === num ? { ...i, hold: !i.hold } : i;
      })
    );
  };
  const startGameButton = () => {
    setStartTimer(true);
    setStartGame(true);
  };
  const handlePlayGame = () => {
    if (gameWon) {
      setTime(0);
      setNumberOfRolls(0);
      setGameWon(false);
      setGameNums(gameArray());
      setStartGame(false);
    } else {
      setNumberOfRolls((a) => a + 1);
      setGameNums((prev) =>
        prev.map((i) => {
          return i.hold ? i : { ...i, number: getRandomInt(1, 6) };
        })
      );
    }
  };
  const displayRolls = () => {
    return numberOfRolls > 0 && <h2>Number of rolls: {numberOfRolls}</h2>;
  };
  useEffect(() => {
    let intervalId;
    if (startTimer) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [startTimer, time]);

  return (
    <React.Fragment>
      {gameWon && <Confetti width={1500} height={700} />}
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: "5rem",
            bgcolor: "#838577",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem 2rem",
            borderRadius: "12px",
            border: "5px solid black",
          }}
        >
          <span>
            {highScore && (
              <Chip
                label={"High score by rolls: " + highScore}
                variant="outlined"
                sx={{
                  alignSelf: "flex-end",
                  fontSize: "1rem",
                  color: "#86eb34",
                  marginRight: "5px",
                }}
              />
            )}
            {timeScore && (
              <Chip
                label={"High score by time: " + getTime(timeScore)}
                variant="outlined"
                sx={{
                  alignSelf: "flex-end",
                  fontSize: "1rem",
                  color: "#86eb34",
                }}
              />
            )}
          </span>

          <Typography variant="h2" sx={{ color: "#0e319c" }}>
            Tenzies
          </Typography>
          <h3>
            Roll until all dice are the same. Click on dice to freeze it at its
            current value between rolls
          </h3>
          <Gridtenz
            gameNums={gameNums}
            handleClick={handleClick}
            gameWon={gameWon}
            startGame={startGame}
          />
          {startGame ? (
            <Button
              variant="contained"
              style={{ marginTop: "1rem", width: "8rem" }}
              onClick={handlePlayGame}
              color={gameWon ? "error" : "primary"}
            >
              {gameWon ? "Reset" : "Roll"}
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ marginTop: "1rem", width: "8rem" }}
              onClick={startGameButton}
              color="secondary"
            >
              Start Game
            </Button>
          )}
          <p
            className="stopwatch-time"
            style={{
              color: "#34ad15",
              backgroundColor: "black",
              padding: "0rem 0.5rem",
              borderRadius: "12px",
              border: "5px solid black",
            }}
          >
            {getTime(time)}
          </p>
          {displayRolls()}
          {gameWon && <WonAlert />}
        </Box>
      </Container>
    </React.Fragment>
  );
  function gameArray() {
    const newArray = [];
    for (let i = 1; i <= 10; i++) {
      newArray.push({ id: i, number: getRandomInt(1, 6), hold: false });
    }
    return newArray;
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function getTime(time) {
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;
    return `${minutes.toString().padStart(2, "0")}:
    ${seconds.toString().padStart(2, "0")}:
    ${milliseconds.toString().padStart(2, "0")}`;
  }
}

export default App;
