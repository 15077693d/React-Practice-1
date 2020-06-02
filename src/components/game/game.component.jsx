import React from 'react'
import { Board } from '../board/board.component'
import { History } from '../history/history.component'
export class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isX: true,
      history:[{values:Array(9).fill(null),id:0}]
    }
  }

  isWin = (currentValues) => {
    /*
    012
    345
    678
    */
    const combinations = [
      [0, 1, 2], [3, 4, 5],
      [6, 7, 8], [0, 4, 8],
      [0, 3, 6], [1, 4, 7],
      [2, 5, 8], [6, 4, 2]]
    let flag = false;
    combinations.forEach(combination => {
      let result = currentValues[combination[0]] + currentValues[combination[1]] + currentValues[combination[2]]
      if (result === "XXX" | result === "OOO") {
        flag = "Winner "+result.slice(0,1)+" !!"
        return flag
      }
    });
    if (this.state.history.length>9){
      flag = "No Win ..."
    }
    return flag
  }

  handleClickBoard = (i,time) => {
    const history = this.state.history.slice()
    const currentValues = this.state.history[time].values.slice()
    // no win, not fill full, is null
    if (!this.isWin(currentValues) & history.length<10 & currentValues[i]===null) {
      // plus new values to history
      let newValues = this.state.history[time].values.slice()
      newValues[i] = this.state.isX?"X":"O"

      this.setState({ history: history.concat([{values:newValues,id:history.length}]) })
      // change isX
      this.setState({
        isX: this.state.isX? false:true
      })
    }
  }

  handleClickHistory = (time) =>{
    this.setState({history:this.state.history.slice(0,time+1)})
  }

  render() {
    let time = this.state.history.length - 1
    const currentValues = this.state.history[time].values.slice()

    const status = this.isWin(currentValues) ? this.isWin(currentValues) : `Next player: ${this.state.isX?"X":"O"}`
    
    return (
      <div className="game">
        <div className="game-board">
          <Board time = {time}  handleClick = {this.handleClickBoard} values={currentValues}/>
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{this.state.history.map((record)=>(<History handleClick={this.handleClickHistory} key={record.id} time = {record.id}/>))}</ol>
        </div>
      </div>
    );
  }
}