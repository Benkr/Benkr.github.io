import React from 'react';
import { StyledCell } from './StyledCell';
import { ADDITIONALSHAPES } from '../../shapes';

const Cell = ({ type }) => (
  <StyledCell type={type} color={ADDITIONALSHAPES[type].color}>
  </StyledCell>
);
export default React.memo(Cell);
