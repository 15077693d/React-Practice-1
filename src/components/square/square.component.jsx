import React from 'react';
export const Square = (props) =>
        (
        <button className="square" onClick={props.handleClick}>
          {props.value}
        </button>
      );

