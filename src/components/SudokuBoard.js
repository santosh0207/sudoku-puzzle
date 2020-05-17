import React, { Component } from 'react';
import SudokuField from "./SudokuField";
import Timer from './Timer';
import Result from './Result';
import { backGroundColor } from '../lib/index'

export default class SudokuBoard extends Component {
    render() {
        const {sudoku, onChange, clickHandle, hintElement,addGame} = this.props;
        console.log(sudoku.startTime,"start time");
        
        return (
            <div className ="content-container">
                {!sudoku.solvedTime && <Timer start ={sudoku.startTime}/>}
                {sudoku.solvedTime && <Result sudoku = {sudoku} addGame={addGame}/>}
                {   
                    sudoku.rows.map((row)=>(
                        
                        <div className="row" key={row.index}>
                            {row.cols.map((field)=>{
                                
                                /** this decides which bg color will take the precidence */
                                let BgColor = backGroundColor(field);

                                /**check for if hint button is used  */
                                let hintEle = false;
                                if(hintElement){                                        
                                    hintEle = hintElement.filter((ele)=>{
                                        if(field.row !== ele.row || field.col !==ele.col){
                                            return false;
                                        }
                                        return true;
                                    }).map((el)=>el);
                                }                                
                                return <SudokuField 
                                    hintele = {hintEle.length}
                                    bg = {BgColor}
                                    solved = {sudoku.solvedTime} 
                                    field = {field}
                                    key = {field.col}
                                    onChange = {onChange} 
                                />
                            })}
                         </div>
                        )
                     )
                }

                {
                    (
                        !sudoku.solvedTime ?
                        (hintElement.length < 80 ?
                            <div className="hintButtonContainer" onClick = {()=>{clickHandle(sudoku)}}> Used Hint ({hintElement.length}/15) </div> :
                            <div className="hintButtonContainerDisabled"> Hint Click Exhausted</div>):
                        null
                    )
                    
                }
                
            </div>
        )
    }
}
