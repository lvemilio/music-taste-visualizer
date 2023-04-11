import React from 'react'

import styled from 'styled-components';

export const Button = ({ text, onClick, style, color, hoverColor }) => {
    const Button = styled.button`
  display: inline-block;
  background-color: ${color};
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  
  &:hover {
    background-color: ${hoverColor};
  }
`;
    return (
        <Button onClick={onClick} style={style}>{text}</Button>
    )
}
