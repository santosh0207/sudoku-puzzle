import React, { Component } from 'react'

export default class Result extends Component {
    render() {
        const {sudoku} = this.props;
        let elapsed  = Math.floor((sudoku.solvedTime.getTime() - sudoku.startTime.getTime())/1000)
        return (
            <div>
                <h3>You have completed The Puzzle in {elapsed} seconds.</h3>
            </div>
        )
    }
}
