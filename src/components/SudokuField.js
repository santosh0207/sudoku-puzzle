import React, { Component } from 'react'

export default class SudokuField extends Component {
    
    hanldleChange =(e) =>{
        const value =e.target.value ==="" ? null : parseInt(e.target.value, 10);
        this.props.onChange({...this.props.field, value:value})
    }
    
    render() {
        const {field, solved, bg, hintele} = this.props;
        let bgColor = bg;
        //console.log(hintele)
        if(hintele){
            bgColor = "#51ff0d";
        }
        return (
            <input 
                className ="field" 
                style ={{backgroundColor: bgColor}}
                value={field.value || ""} 
                readOnly = {field.readOnly} 
                onChange = {this.hanldleChange}
                disabled = {solved || hintele}
            />
        )
    }
}
