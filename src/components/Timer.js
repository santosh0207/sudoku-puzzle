import React, { Component } from 'react'

export default class Timer extends Component {
    
    state = {
        elapsed : (parseInt(localStorage.getItem("Timer"),10) || 0)
    }

    componentDidMount() {
        this.interval = setInterval(()=>{
            this.setState({
                elapsed:Math.floor(
                    (new Date().getTime() - this.props.start.getTime())/1000 
                    )
            })
        })
    }

    componentWillUnmount(){
        delete this.interval;
    }

    render() {
        
        const {elapsed} = this.state;

        let timeMM = Math.floor(elapsed/60);
        let timeHH = Math.floor(elapsed /(60*60));
        let timeSS = elapsed
        if(elapsed >= 60){
            timeSS = Math.floor(elapsed%60);
        }

        return (
            <div>
                {
                    (localStorage.getItem("sudokuPuzzleSolved"))?
                        <h3>Game Completed : {parseInt(JSON.stringify(localStorage.getItem("sudokuPuzzleSolved")),0)}</h3>:
                        <h3>Game Completed : 0</h3>
                }
                <h2>Time : {timeHH<10?"0"+timeHH:timeHH}:{timeMM<10?"0"+timeMM:timeMM}:{timeSS<10?"0"+timeSS:timeSS} </h2>
            </div>
        )
    }
}
