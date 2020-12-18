import React from 'react';
import {calcData, styles, commaDecimal} from "./App.js";
import {DrawShapesGraph} from './flexgraph.js'

let blueCounter = 0

//for the non build verion, use .69
// let flowForward = .91;
let flowForward = .905;
let flowForwardFast = .91;

let redCounter = 0
// let negIncrease = Math.PI * 2/9.24;
// let flowBackward = .892;
let flowBackward = .89;
let prevBlueHeight = 0;
let prevRedHeight = 0;
export default function JellyJar() {



  calcData.posFlowsTotal = 0;
  calcData.negFlowsTotal = 0;
  calcData.highestModFlow = [];
  calcData.positiveFlows = [];
  calcData.negativeFlows = [];
  calcData.averagePositiveFlow = [];
  calcData.averageNegativeFlow = [];

  for (let flow in calcData.modCashFlows) {
    let flowValue = calcData.modCashFlows[flow];
  
    if (flowValue > 0) {
      if (flowValue > calcData.highestModFlow) {
        calcData.highestModFlow = flowValue;
      }
      calcData.positiveFlows.push(flowValue);
      calcData.posFlowsTotal += flowValue;
    }
    else if (flowValue < 0) {
      let inverseFlowValue = flowValue * -1;

      if (inverseFlowValue > calcData.highestModFlow) {
        calcData.highestModFlow = inverseFlowValue;
      }
      calcData.negativeFlows.push(inverseFlowValue);
      calcData.negFlowsTotal += inverseFlowValue;
    }
  }
  if (calcData.posFlowsTotal !== 0) {
    calcData.averagePositiveFlow = calcData.posFlowsTotal/calcData.modCashFlows.length;
  }
  if (calcData.negFlowsTotal !== 0) {
    calcData.averageNegativeFlow = calcData.negFlowsTotal/calcData.modCashFlows.length;
  }

  let containerHeight = calcData.highestFlow;
  let heightMultiplier = containerHeight / 92;
  let negativeLiquidHeight = Number(calcData.averageNegativeFlow/heightMultiplier) + 2;
  let positiveLiquidHeight = Number(calcData.averagePositiveFlow/heightMultiplier) + 2;






  // calcData.positiveFlows.sort();
  // calcData.negativeFlows.sort();



  let jellyStyles = {
    canvasWidth: "15vw",
    canvasHeight: "11vw",
    canvasPadLeft: "-.7vw",
    canvasPadTop: 0,
    lineSize: .2,
    fontSize: 2,
    fontColor: "none",
    axisColor: "none",
    boxAxisColor: styles.darkGray,
    boxRadius: .5,
    axisLineSize: .2,

    tickColor: "none",
    tickLineSize: .1,
    clickPointColor: "#C18FE4",
    pointSize: 1,
    selectedPointSize: 2,


    markerLineSize: .3,
    canvasColor: "none",
}
  let positiveLiquidDraw = [];
  let negativeLiquidDraw = [];

  
  //wave animation on slider change
  function getRedSine() {
    // console.log("prev " + prevRedHeight + " current " + negativeLiquidHeight)
    // if (prevRedHeight < negativeLiquidHeight) {
    // redCounter += flowBackward
    // }
    // else {
      redCounter += flowForward
    // }
    let redy = Math.sin(redCounter) /2 + .5;
    return redy *2.5
  }
  function getSine() {
    // if (prevBlueHeight < positiveLiquidHeight) {
    //   blueCounter += flowForward
    // }
    // else {
      blueCounter += flowForwardFast
    // }
 
   let y = Math.sin(blueCounter) /2 + .5;
   return y * 2.5
   

    
  }

//load default data if none present "#F50057" "#27293E"
    if (positiveLiquidHeight > 2) {
      let height = positiveLiquidHeight + negativeLiquidHeight;
      positiveLiquidDraw.push([98, 2], [98, height + getSine()]);

      for (let i = 92; i > 2; i -= 8) { 
        positiveLiquidDraw.push([i, height + getSine()])
      }
      
     positiveLiquidDraw.push( [2, height + getSine()], [2, 2]);
    }

    if (negativeLiquidHeight > 2) {
      negativeLiquidDraw.push([98, 2], [98, negativeLiquidHeight + getRedSine()]);
      for (let i = 92; i > 2; i -= 8) {
        negativeLiquidDraw.push([i, negativeLiquidHeight + getRedSine()])
      }

      negativeLiquidDraw.push([2, negativeLiquidHeight + getRedSine()], [2, 2] )
  
    }

    let data = {
      "#27293E": positiveLiquidDraw,
      "#F50057": negativeLiquidDraw
    }


 //<input style = {{position: "absolute", top: -120}} onChange={(event) => {flowForward = parseFloat(event.target.value); console.log(flowForward)}}></input>

  prevBlueHeight = positiveLiquidHeight;
  prevRedHeight = negativeLiquidHeight;
  return (
   
        DrawShapesGraph(data, jellyStyles)
 
  
  );
}

export function jellyDisplay() {
  let posStyle = {
    fontWeight: "medium",
    color : styles.positiveColor,
    fontSize: "1vw",
    textAlign: "center",
    margin: 0,
  }

  let plusStyle = {
    fontWeight: "bold",
    color : styles.canvasColor,
    fontSize: ".8vw",
    textAlign: "center",
    margin: "-.2vw",
  }

  let negStyle = {
    fontWeight: "medium",
    color : styles.negativeColor,
    fontSize: "1vw",
    textAlign: "center",
    marginLeft: "",
    marginTop: 0,
    marginBottom: 0,
  }
  function negOutput() {
    if (calcData.negFlowsTotal !== 0) {
      return commaDecimal(calcData.negFlowsTotal * -1);
    }
    else {
      return 0;
    }
  }

 
  return (
    <div style = {{position: "absolute", width: "100%",height: "16%", bottom: "1%", background: "none"}}>
      <p style = {posStyle}>{commaDecimal(calcData.posFlowsTotal)}</p>
      <p style = {plusStyle}>+</p>
      <p style = {negStyle}>{negOutput()}</p>
    </div>
  )
}