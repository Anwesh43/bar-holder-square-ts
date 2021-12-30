import React from 'react'
import {useStyle} from './hooks'
import withContext from './withContext'

interface BHSProps {
    w : number, h : number, scale : number, onClick : Function
}

const BarHolderSquare = (props : BHSProps) => {
    const {squareStyle, barStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <div style = {barStyle()} onClick = {() => props.onClick()}></div>
            {[0, 1].map((i) => (<div key = {`square_${i}`} style = {squareStyle(i)}></div>))}
        </React.Fragment>        
    )
}

export default withContext(BarHolderSquare)