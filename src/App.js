import React, { Component } from 'react';
import './App.css';
import SudokuBoard from './components/SudokuBoard';
import produce from 'immer';
import { checkSolution, generateSudoku, randomRange} from './lib';
import Footer from './components/Footer/Footer';

class App extends Component {
  /**
   * Immer is used to maintain the state non-mutatable
   */
  state = produce({},()=>({ 
    sudoku : generateSudoku()
  })); 

  onChangeHandler = (e) =>{
    this.setState(
      produce((state)=>{
        state.sudoku.rows[e.row].cols[e.col].value = e.value ;

        if(!state.sudoku.solvedTime){
          const solved = checkSolution(state.sudoku);
          if(solved){
            console.log("####################################")
            state.sudoku.solvedTime = new Date();

            localStorage.setItem('sudokuPuzzle', null);

            if(localStorage.getItem("sudokuPuzzleSolved")){
              localStorage.setItem("sudokuPuzzleSolved",parseInt(JSON.stringify(localStorage.getItem("sudokuPuzzleSolved")),0)+1);
            }else{
              localStorage.setItem('sudokuPuzzleSolved', 1);
            }
          }
        }
      })
    )
  }

  addNewGame =()=>{
    this.setState(
      produce((state) => {
       state.sudoku = generateSudoku()
      })
    )
  }
  solveSudoku =(sudoku)=>{
    /**
     * finding all the possible square where we can fill
     * 
     */
    var arrayOfAllPossiblePlace = sudoku.rows
                    .map((row)=>(row.cols
                      .filter((col)=>{
                        if(col.value !== null)
                          return false;
                        
                        return true;
                      })
                      .map((col)=>col)
                      )
                    )
                    .flat()
             
   var randomIndex = randomRange(0,arrayOfAllPossiblePlace.length);
   var element = arrayOfAllPossiblePlace[randomIndex];
   console.log(element)
   if(element){
    this.setState(
      produce((state) => {
        state.sudoku.rows[element.row].cols[element.col].value = state.sudoku.solution[element.row*9+element.col];
        state.sudoku.hintElement.push(element);
        
        localStorage.setItem('sudokuPuzzle', JSON.stringify(state.sudoku));

      })
    )
   }
  
  }

  render(){
   //console.log(this.state.sudoku.hintElement,"inisde App")
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sudoku Puzzle</h1>
        </header>
        <SudokuBoard 
            sudoku={this.state.sudoku} 
            onChange = {this.onChangeHandler} 
            clickHandle = {this.solveSudoku}
            hintElement = {this.state.sudoku.hintElement}
            addGame= {this.addNewGame}
        />
        <Footer  />
      </div>
    );
  }
  
}

export default App;
