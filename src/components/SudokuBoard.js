import React, { Component } from 'react';
import SudokuField from "./SudokuField";
import Timer from './Timer';
import Result from './Result'

export default class SudokuBoard extends Component {
    render() {
        const {sudoku, onChange, clickHandle, hintElement} = this.props;
        return (
            <div className ="content-container">
                {!sudoku.solvedTime && <Timer start ={sudoku.startTime}/>}
                {sudoku.solvedTime && <Result sudoku = {sudoku}/>}
                {   
                    sudoku.rows.map((row)=>(
                        
                        <div className="row" key={row.index}>
                            {row.cols.map((field)=>{
                                let BgColor = ""
                                if(field.row <3 ){
                                    if(field.col<3){
                                        BgColor="#E0F6CD";
                                    }else if( field.col >=3 && field.col<6){
                                        BgColor = "#F6CDDC";
                                    }else if(field.col >=6){
                                        BgColor = '#CDF6D2';
                                    }
                                }else if(field.row >=3 && field.row<6){
                                    if(field.col<3){
                                        BgColor = "#E0CDF6";
                                    }else if( field.col >=3 && field.col<6){
                                        BgColor = '#CDD2F6';
                                    }else if(field.col >=6){
                                        BgColor = "#E1CDF6";
                                    }
                                }else if(field.row >=6){
                                    if(field.col<3){
                                        BgColor = '#CDF6E9';
                                    }else if( field.col >=3 && field.col<6){
                                        BgColor = '#F6CDF3';
                                    }else if(field.col >=6){
                                        BgColor = "#E1F6CD"
                                    }
                                }

                                let hintEle = false;
                                
                                if(hintElement){                                        
                                    hintEle = hintElement.filter((ele)=>{
                                        if(field.row !== ele.row || field.col !==ele.col){
                                            return false;
                                        }
                                        return true;
                                    }).map((el)=>el);
                                }

                                //console.log(hintElement, hintEle);
                                
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
                {hintElement.length < 15 ?
                    <div className="hintButtonContainer" onClick = {()=>{clickHandle(sudoku)}}> Use Hint ({15-hintElement.length}/15) </div> :
                    <div className="hintButtonContainerDisabled"> Hint Click Exhausted</div>
                }
                
            </div>
        )
    }
}
