import React from 'react';
import { ReactSVG } from 'react-svg';
import styled, { css } from 'styled-components';

const StyledSVGIcon = styled(ReactSVG)`
  svg {
    fill: black;
    ${({ size }) =>
      size &&
      css`
        width: ${size};
        height: ${size};
      `}
    ${({ transform }) =>
      transform &&
      css`
        transform: ${transform};
      `}
    path {
      ${({ color }) =>
        color &&
        css`
          fill: ${color};
        `}
      &:hover {
        ${({ hoverColor }) =>
          hoverColor &&
          css`
            fill: ${hoverColor};
          `}
      }
    }
  }
`;

const Icon = (props) => {
  let src = '/assets/icons/';
  if (props.path) {
    src = props.path;
  }
  return (
    <StyledSVGIcon
      src={`${src}${props.name}.svg`}
      color={props.color}
      size={props.size}
      transform={props.transform}
      className={props?.class}
      hoverColor={props?.hoverColor}
    />
  );
};

export default Icon;
