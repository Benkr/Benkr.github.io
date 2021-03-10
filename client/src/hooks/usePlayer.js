import { useState, useCallback } from 'react';
import { iRandomShape, ADDITIONALSHAPES, iARandomShape } from '../shapes';
import { STAGE_WIDTH, checkCollision } from '../gamehelpers';
export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    shape: ADDITIONALSHAPES[0].shape,
    collided: false,
  });
  function rotate(matrix, dir) {
    const mtrx = matrix.map((_, index) => matrix.map(column => column[index]));
    if (dir > 0) return mtrx.map(row => row.reverse());
    return mtrx.reverse();
  }
  function playerRotate(stage, dir) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.shape = rotate(clonedPlayer.shape, dir);
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.shape[0].length) {
        rotate(clonedPlayer.shape, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      shape: iRandomShape().shape,
      collided: false,
    });
  }, []);
  const resetNewPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      shape: iARandomShape().shape,
      collided: false,
    });
  }, []);
  return [player, updatePlayerPos, resetPlayer, playerRotate, resetNewPlayer];
};
