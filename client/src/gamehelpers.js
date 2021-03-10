export var STAGE_WIDTH = 12;
export var STAGE_HEIGHT = 20;
export const createStage = (x = 0) =>
  {
    return Array.from(Array(STAGE_HEIGHT + x), () => Array(STAGE_WIDTH + x).fill([0, 'clear']));
  };
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.shape.length; y += 1) {
    for (let x = 0; x < player.shape[y].length; x += 1) {
      if (player.shape[y][x] !== 0) {
        if (
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'clear'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
