import React from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {styles} from './App.js';
import {calcData} from "./App.js";
import {LineMarkGraph} from './flexgraph.js'






function Graph()  {
  let graphStyles = {
    canvasWidth: "43vw",
    canvasHeight: "17vw",
    canvasPadLeft: "2vw",
    canvasPadTop: "1vw",
    labelColor: "none",
    lineSize: .2,
    fontSize: 1.5,
    displayFontSize: 1.2,
    fontColor: styles.darkGray,
    axisColor: styles.canvasColor,
    axisLineSize: .3,
    xTicks: 4,
    yTicks: 4,
    tickColor: styles.canvasColor,
    tickLineSize: .1,
    clickPointColor: "#47C4C1",
    pointSize: 1,
    selectedPointSize: 1.5,
    xName: "RATE OF RETURN (%)",
    yName: "NPV ($)",
    popXDisplay: "ROR",
    popYDisplay: "NPV",
    markerLineColor: styles.darkGray,
    markerLineSize: .2,
    background: styles.lightCanvasColor,
    drawDisplay: "false",
    xSymbol: "%",
    ySymbol: "",
    selectedPoint: calcData.npvSnap[0], 


    drawPoints: "false",
    drawLines: "true",
    type: ["Line", "Mark"],
    // selectedPoint: [calcData.r, calcData.theNPV]
  }




  
  // let calcInput = [[0,0]];
  // if (calcData.npvSnap != 0) {
  //   calcInput = calcData.npvSnap
  // }
  
  let calcInput = [[0,0]];
  let npvSnap = [[0,0]]


    
  calcInput = calcData.allNpvPoints;



    
  npvSnap = calcData.npvSnap;


 
  let data = {
    "#47C4C1": calcInput,
    "#ADDCE3": npvSnap
  };




// let styles = [];
let graph = LineMarkGraph(data, graphStyles);



//<FlexibleXYPlot margin={{left: 0, right: 0, top: 0, bottom: 0}}>    
    return (
      <div>
                  <div style={{color: styles.darkGray, fontSize: ".7vw", position: "absolute", transform: "rotate(-90deg)", left: "-1%", top: "48%"}}>NPV ($)</div>
        <div style={{color: styles.darkGray, fontSize: ".7vw", position: "absolute", left: "43%", top: "93%"}}>RATE OF RETURN (%)</div>
          {graph}
    
      </div>
    );
  
}

export default Graph;