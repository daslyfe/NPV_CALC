import React from 'react';
// import DrawSmooth  from "./bezierInterp.js";
import GetDrawData from "./drawData.js"
// import { spring } from 'popmotion';
import { styles } from './App.js'
import {calcData} from "./App.js";
 


// const pathSettle = 50;

let updateData = true;
let animDrawData = [];
let drawData = [];

const commaDecimal = (number) => Intl.NumberFormat('en-US', {
  style: "decimal",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
}).format(number);


function getRectangleSVG(key, topLeftPoint, width, height, fill, strokeColor, strokeWidth, radius) {
  return(  
      <rect 
      key={key}
      x={topLeftPoint[0]} y ={topLeftPoint[1]} //array [x,y]
      width = {width} height = {height}
      fill={fill} //string
      stroke={strokeColor} //string
      strokeWidth={strokeWidth} 
      rx={radius}
    />
  
  )
}

function Sketch(){
  //console.log("Ran Sketch");  
  //wave path
  // const [path, setpath] = React.useState();
 
  if (updateData){
    drawData = GetDrawData();
    let numBars = drawData.values.drawBarHeights.length;
    let  textWidth = "67%";
    let longestLength = commaDecimal(calcData.highestFlow).toString().length;
    
      let drawText = true;
      let multiplier = longestLength/3;
      let divider = 400;
      if (numBars <= 3) {
        divider = numBars * 100;
      }
      if (longestLength < 4) {
        multiplier= 1;
      }
      let tWidth = divider/(numBars * multiplier);
      textWidth = tWidth + "%";
      if (tWidth < 17) { 
        drawText = false;
      }

    
    
    
    //push wave points and rectange svg to local drawData
    for (var value in drawData.values.drawBarHeights) {
      let key = value;
      if (drawData.values.drawBarHeights[value] >= 0) {  
          drawData.rectangles.bars.push(getRectangleSVG(key, [drawData.values.barPosX, drawData.values.barCanvas - drawData.values.drawBarHeights[value]], drawData.values.barWidth, drawData.values.drawBarHeights[value], styles.positiveColor));
          drawData.rectangles.glass.push(getRectangleSVG("glass" + key, [drawData.values.barPosX - drawData.values.glassPad, -16], drawData.values.barWidth + drawData.values.doubleGlassPad, 114, "none", styles.gray, .3, 1));
          //drawData.points.wavePoints.push([drawData.values.barPosX, drawData.values.barCanvas - drawData.values.drawBarHeights[value]]);
          drawData.points.wavePoints.push([drawData.values.barPosX + drawData.values.barWidth, drawData.values.barCanvas - drawData.values.drawBarHeights[value]]);         
          //drawData.points.negWavePoints.push([drawData.values.barPosX, drawData.values.drawBoxHeight]);
          drawData.points.negWavePoints.push([drawData.values.barPosX + drawData.values.barWidth, drawData.values.drawBoxHeight]);
          if (drawText === true) {
            drawData.rectangles.modFlows.push(<text key={key + "modText"} style={{fontSize: textWidth}} fill={styles.positiveColor} x={drawData.values.barPosX -1} y="112">{commaDecimal(calcData.modCashFlows[value])}</text>)
          }
          drawData.values.barPosX += (drawData.values.barWidth + drawData.values.barPadx);
         
      }
      else if (drawData.values.drawBarHeights[value] < 0) {
          drawData.rectangles.bars.push(getRectangleSVG(key, [drawData.values.barPosX, drawData.values.barCanvas - (drawData.values.drawBarHeights[value] * -1)], drawData.values.barWidth, (drawData.values.drawBarHeights[value] * -1), styles.negativeColor));
          drawData.rectangles.glass.push(getRectangleSVG("glass" + key, [drawData.values.barPosX - drawData.values.glassPad, -16], drawData.values.barWidth + drawData.values.doubleGlassPad, 114, "none", styles.gray, .3, 1));

          //drawData.points.negWavePoints.push([drawData.values.barPosX, drawData.values.barCanvas - drawData.values.drawBarHeights[value] * -1]);
          drawData.points.negWavePoints.push([drawData.values.barPosX + drawData.values.barWidth, drawData.values.barCanvas - drawData.values.drawBarHeights[value] * -1]);
          //  drawData.points.wavePoints.push([drawData.values.barPosX, drawData.values.drawBoxHeight]);
          drawData.points.wavePoints.push([drawData.values.barPosX + drawData.values.barWidth, drawData.values.drawBoxHeight]);
          if (drawText === true) {
          drawData.rectangles.modFlows.push(<text key={key + "modText"} style={{fontSize: textWidth}} fill={styles.negativeColor} x={drawData.values.barPosX -1} y="112">{commaDecimal(calcData.modCashFlows[value])}</text>)
          }
          drawData.values.barPosX += (drawData.values.barWidth + drawData.values.barPadx);
          
          
      }
 
      //drawData.rectangles.modFlows.push(<p style={{position: "absolute", left: modPosX + "%", fontSize: "1vw", background: "blue" }}>3</p>);

    }

  }
  else {
    drawData = animDrawData;
  }

  // async function runSpring() {    
  //   for (let point in drawData.points.wavePoints) {
  //     spring({ from: drawData.points.wavePoints[point][1], to: pathSettle, stiffness: 150, damping: 5 })
  //         .start(v => {drawData.points.wavePoints[point][1] = v; setpath(DrawSmooth(drawData.points.wavePoints, 1))})
  //   }
  // }

  if(drawData.rectangles.bars.length > 0){
    return(
      <div>
        <svg
          style={{
          position: "absolute",
          background: 'none',
          top: "10%",
          left: "5%",
          width: "90%", 
          height: "90%"
          }}
          viewBox="0 0 200 100"
        >{drawData.rectangles.bars}{drawData.rectangles.modFlows}{drawData.rectangles.glass}
        </svg>
        <div>
        {/* <button name="animate" onClick ={ () => {updateData= false; animDrawData = drawData; runSpring()}}>Animate Waves</button>   */}
        
        </div>
      </div>

    );
  }
  else {
    const noCashFlowsStyle = {
      textAlign: "left",
      marginLeft: "1vw",
      fontSize: "1vw",
      fontStyle: "montserrat",
    }
    return (
    <div>
      <p style={noCashFlowsStyle}>To get started,</p>
      <p style={noCashFlowsStyle}>input some cashflows in the box on the left</p>
    </div>
      
      )
  }
}

//const lineCommand = point => `L ${point[0]} ${point[1]}`


export default Sketch;