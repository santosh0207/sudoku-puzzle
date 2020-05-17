import genrator from 'sudoku';

/**
 * Generate the Sudoku with the Structure
 * {rows:[{index:0,cols:[{row:0,col:0,value:1,randomly:true},...]},...]}
 */
export function generateSudoku (){
  const raw = genrator.makepuzzle();
  const rawSolution = genrator.solvepuzzle(raw);

  const modifiedRaw = raw.map((e)=>(e===null?null:e+1));
  const modifiedSolution = rawSolution.map((e)=>(e+1));

  let result = { 
    rows:[],
    solution:modifiedSolution,
    startTime:new Date(),
    solvedTime: null,
    hintElement : []
  };

  for(let i=0; i<9;i++){
    const row = {cols:[],index:i};
    for(let j=0;j<9;j++){
      const value = modifiedRaw[i*9+j];
      const col ={
        row:i,
        col:j,
        value:value, 
        readOnly: value !== null
      }
      row.cols.push(col);
    }
    result.rows.push(row);
  }
  return result;
}


export function checkSolution (sudoku){

    const candidate = sudoku.rows
        .map((row)=>row.cols.map((col)=>col.value))
        .flat();
  
    for(let i=0;i<candidate.length;i++){
      if(candidate[i]===null || candidate[i] !== sudoku.solution[i]){
        return false;
      }
    }
  
    return true;
}
  
//for generating Random values between given Numbers
export const randomRange = (minNum, maxNum)=> {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}