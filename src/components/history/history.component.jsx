import React from 'react'
export const History = (props) => (
    <ul><button key={props.time} onClick={() => props.handleClick(props.time)}>{props.time===0?"Start Game!":`${props.time}. Go Step #${props.time}`}</button></ul>
)