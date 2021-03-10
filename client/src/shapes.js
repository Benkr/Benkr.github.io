export const INITIALSHAPES = {
  0: { shape: [[0]], color: '0, 0, 0' },
  I: {
      shape: [
          [0, 'I', 0, 0],
          [0, 'I', 0, 0],
          [0, 'I', 0, 0],
          [0, 'I', 0, 0]
      ],
      color: '80, 227, 230' 
  },
  J: {
    shape: [
        [0, 'J', 0],
        [0, 'J', 0],
        ['J', 'J', 0]
    ],
    color: '36, 95, 223' 
  },
  L: {
    shape: [
        [0, 'L', 0],
        [0, 'L', 0],
        [0, 'L', 'L']
    ],
    color: '223, 173, 36' 
  },
  O: {
    shape: [
        ['O', 'O'],
        ['O', 'O']
    ],
    color: '223, 217, 36' 
  },
  S: {
    shape: [
        [0, 'S', 'S'],
        ['S', 'S', 0],
        [0, 0, 0]
    ],
    color: '48, 211, 256' 
  },
  T: {
    shape: [
        [0, 0, 0],
        ['T', 'T', 'T'],
        [0, 'T', 0]
    ],
    color: '132, 61, 198' 
  },
  Z: {
    shape: [
        ['Z', 'Z', 0],
        [0, 'Z', 'Z'],
        [0, 0, 0]
    ],
    color: '7, 78, 78' 
  }
}
export const ADDITIONALSHAPES = 
  {
  U: {
    shape: [
        [0, 0, 0, 0],
        ['U', 0, 0, 'U'],
        ['U', 0, 0, 'U'],
        ['U', 'U', 'U', 'U']
    ],
    color: '80, 227, 230' 
  },
  C: {
    shape: [
        [0, 0, 0],
        ['C', 0, 'C'],
        ['C', 'C', 'C']
    ],
    color: '80, 227, 230' 
  },
  c: {
    shape: [
      ['c', 0],
      ['c', 'c']
  ],
    color: '80, 227, 230' 
  }  
, ...INITIALSHAPES };
export const iRandomShape = () => {
  const shape = 'IJLOSTZ';
  const iRandShape = shape[Math.floor(Math.random() * shape.length)];
  return INITIALSHAPES[iRandShape];
}

export const iARandomShape = () => {
  const shape = 'IJLOSTZUCc';
  const iRandShape = shape[Math.floor(Math.random() * shape.length)];
  return ADDITIONALSHAPES[iRandShape];
}