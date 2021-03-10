import React, { useState } from 'react';
import { createStage, checkCollision } from '../../gamehelpers';
import { StyledQuadraticWrapper, StyledQuadratic} from './StyledQuadratic';
import { useInterval } from '../../hooks/useInterval';
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';
import { useGameStatus } from '../../hooks/useGameStatus';
import Stage from '../Stage/Stage';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';
var counter = 1;
var currentStage = 0;
const Quadratic = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate, resetNewPlayer] = usePlayer(currentStage);
  var [stage, setStage, rowsCleared] = useStage(player, resetPlayer, currentStage, resetNewPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };
  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };
  const expand = () => {
    currentStage++;
    setStage(createStage(currentStage));
    counter++;
  }
  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };
  const drop = (complete) => {
    if(rows / 5 >= counter && rows / 5 < counter + 5) {
      expand();
    }
    if (complete === true) {
      setDropTime(Infinity);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setDropTime(null);
        setGameOver(true);
        if (score > localStorage.getItem('highScore')) {
          console.log('New High Score!');
          localStorage.setItem('highScore', score);
        }
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      setDropTime(1000 / (rows + 1) + 300);
    }
  };
  const dropPlayer = (complete) => {
    setDropTime(null);
    if (complete) {
      drop(true);
    }
    drop(false);
  };
  useInterval(() => {
    drop();
  }, dropTime);
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      } else if (keyCode === 191) {
        dropPlayer(true);
      }
    }
  };
  return (
    <StyledQuadraticWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledQuadratic>
        <Stage stage={stage}/>
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>

              <Display text={`High Score: ${localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0}`} />
              <Display text={`Score: ${score}`} />
              <Display text={`Rows Cleared: ${rows}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledQuadratic>
    </StyledQuadraticWrapper>
  );
};
export default Quadratic;