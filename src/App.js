import React from "react";
import Sketch from "./sketch";
import "./App.css";
import Graph from "./graph.js";
import JellyJar, { jellyDisplay } from "./jellyJar.js";
import bubble from "./svg/bubble2.svg";
import help from "./help.json";
// import findIRR from './irr.js';
import { getPathSVG, drawCanvas, FlexButton } from "./flexgraph.js";

export var modCashFlows = [];

const dollarFormat = (number) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number);

function removeCommas(num) {
  if (num) {
    return parseFloat(num.replace(/,/g, ""));
  } else {
    return num;
  }
}

function rndNearTenth(num) {
  return parseFloat((Math.round(num * 100) / 100).toFixed(2));
}

export const commaDecimal = (number) =>
  Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(number);

export let calcData = {
  initialInvest: 0,
  cashFlows: [0, 0, 0, 0, 0],
  modCashFlows: [],
  positiveFlows: [],
  negativeFlows: [],
  highestFlow: [],
  highestModFlow: [],
  averagePositiveFlow: [],
  averageNegativeFlow: [],
  posFlowsTotal: 0,
  negFlowsTotal: 0,
  theNPV: 0,
  npvSnap: [],
  snapGraphX: 0,
  r: "50.00",
  testVar: 0,
  irr: null,
  discountFactor: 0.67,
  avgNpvYr: 0,
  allNpvPoints: [],
};
export let styles = {
  canvasColor: "#E9E9E9",
  lightCanvasColor: "#FFFFFF",
  textColor: "#000000",
  innerCashBoxColor: "#FBFBFB",
  medLightGray: "#D8D8D8",
  negativeColor: "#F50057",
  positiveColor: "#27293E",
  darkGray: "#3A3A3A",
  gray: "#8C8E8E",
  irrColor: "#53DD6C",
  npvBtnColor: "#57A773",
  boxRadius: ".5vw",
  calcPadLeft: "8%",
  calcPadTop: "10%",
  bottomRowPadTop: "57%",
  firstRowHeight: "44.5%",
  secondRowHeight: "38%",
  lightBlue: "#47C4C1",
};

const calcCanvas = {
  position: "absolute",
  top: "0",
  left: "0",
  background: styles.canvasColor,
  height: "50vw",
  width: "74vw",
};

const calcTitle = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: "2vw",
  left: styles.calcPadLeft,
  top: parseInt(styles.calcPadTop) - 11 + "%",
};
//..........CASHBOX......//

const cashFlowBox = {
  position: "absolute",
  top: styles.calcPadTop,
  left: styles.calcPadLeft,
  background: styles.lightCanvasColor,
  height: "57%",
  width: "18%",
  borderRadius: ".5vw",
};
const innerCashBox = {
  position: "absolute",
  top: "8%",
  background: styles.innerCashBoxColor,
  height: "83%",
  width: "100%",
  overflowY: "scroll",
  overflowX: "auto",
  //fontWeight: "800"
};

const cashContents = {
  background: "none",
  width: "100%",
  height: "2.6vw",
};

const cashBottom = {
  position: "absolute",
  top: "88%",
  left: "0%",
  width: "100%",
  height: "12%",
  background: "none",
  fontWeight: "500",
  fontSize: ".9vw",
  color: styles.darkGray,
};

const lineBreak = {
  background: "#F0F0F0",
  height: "1px",
  left: "15%",
  width: "75%",
  position: "absolute",
};

//.....DISCOUNT RATE BOX.........

const dRateBox = {
  position: "absolute",
  top: 70 + "%",
  left: styles.calcPadLeft,
  background: styles.lightCanvasColor,
  height: "15%",
  width: cashFlowBox.width,
  borderRadius: styles.boxRadius,
};
const sliderStyle = {
  position: "absolute",
  top: "36%",
  left: "11%",
  background: "styles.canvasColor",
  cursor: "pointer",
  width: "75%",
  height: "25%",
};
const DRateText = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: ".8vw",
  left: "1vw",
  top: ".8vw",
};
const DFactorText = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: ".8vw",
  left: "1vw",
  top: "65%",
};
//.......SKETCHBOX...........
const sketchBox = {
  position: "absolute",
  top: styles.calcPadTop,
  left: "29%",
  background: styles.lightCanvasColor,
  height: styles.firstRowHeight,
  width: "41%",
  borderRadius: styles.boxRadius,
};

//.....NpvStatBOX.....

const NpvStatBox = {
  position: "absolute",
  top: styles.calcPadTop,
  left: "73%",
  background: styles.lightCanvasColor,
  height: styles.firstRowHeight,
  width: "18.5%",
  borderRadius: styles.boxRadius,
  overflowX: "hidden",
};

const avgNPVHeader = {
  position: "relative",
  fontWeight: "medium",
  fontSize: "1.2vw",
  top: 0,
  color: styles.gray,
  textAlign: "center",
  marginTop: "-.5vw",
  marginBottom: 0,
};

//......GRAPH BOX.......

const graphBox = {
  position: "absolute",
  top: styles.bottomRowPadTop,
  left: "29%",
  background: styles.lightCanvasColor,
  height: styles.secondRowHeight,
  width: "62.5%",
  borderRadius: styles.boxRadius,
};

const header1 = {
  fontWeight: "bold",
  fontSize: ".8vw",
  textAlign: "center",
};

function dollSymbol(value, color) {
  let numSize = 0.6;
  let numX = "39%";
  let numY = "86%";
  if (value > 9) {
    numSize = 0.5;
    numX = "31%";
    numY = "85%";
  }

  return (
    <svg
      style={{ position: "absolute", background: "none" }}
      height="2.6vw"
      width="1.5vw"
    >
      <text
        key="dollarSymbol"
        style={{ fontSize: "2vw", fontWeight: "400", fill: color }}
        x="8%"
        y="75%"
      >
        $
      </text>
      <circle
        key="dollcircle"
        style={{ fill: color }}
        cx="52%"
        cy="78%"
        r="18%"
      />
      <text
        key="innernumber"
        style={{
          fontSize: numSize + "vw",
          fontWeight: "700",
          fill: styles.innerCashBoxColor,
        }}
        x={numX}
        y={numY}
      >
        {value}
      </text>
    </svg>
  );
}

//the bottom arrow is getting shifted up whenever the page reloads for some reason

const drawArrows = () => {
  let canvasStyles = {
    canvasPadLeft: 0,
    canvasPadTop: 0,
    canvasWidth: "74vw",
    canvasHeight: "50vw",
    canvasColor: "none",
  };

  let firstArrowLeft = 27;
  let firstArrowTop = 30;
  let secondArrowLeft = 71;
  let secondArrowTop = 30;
  // let bottomArrowLeft = 80;
  // let bottomArrowTop = 56
  let secondArrow = getPathSVG(
    "drawArrowb",
    canvasStyles,
    [
      [secondArrowLeft, secondArrowTop],
      [secondArrowLeft, secondArrowTop + 3],
      [secondArrowLeft + 1.25, secondArrowTop + 1.5],
    ],
    "none",
    0,
    0,
    0,
    styles.medLightGray
  );
  let firstArrow = getPathSVG(
    "drawArrowa",
    canvasStyles,
    [
      [firstArrowLeft, firstArrowTop],
      [firstArrowLeft, firstArrowTop + 3],
      [firstArrowLeft + 1.25, firstArrowTop + 1.5],
    ],
    "none",
    0,
    0,
    0,
    styles.medLightGray
  );
  // let thirdArrow = getPathSVG("thirdarrow", canvasStyles, [[bottomArrowLeft, bottomArrowTop], [bottomArrowLeft + 3.5, bottomArrowTop], [bottomArrowLeft + 1.75, bottomArrowTop + 2]], "none", 0, 0, 0, styles.medLightGray);
  let canvas = drawCanvas("arrowcanvas", canvasStyles, [
    firstArrow,
    secondArrow,
  ]);
  return canvas;
};

function npvResult() {
  const style = {
    position: "relative",
    fontWeight: "medium",
    fontSize: "2vw",
    top: 0,
    color: styles.lightBlue,
    textAlign: "center",
    marginTop: "-.5vw",
    marginBottom: "0vw",
  };
  // let length = parseInt(calcData.theNPV.toString().length);
  var npvResult = dollarFormat(calcData.theNPV);
  let npvLength = npvResult.length;
  if (npvLength >= 12) {
    style.fontSize = 20 / npvLength + "vw";
  }
  return <p style={style}>{npvResult}</p>;
}

let HelpButton = (mouseDown, mouseOver) => {
  let col = styles.darkGray;
  let activeCol = styles.lightBlue;
  let color = col;

  const [active, setActive] = React.useState(false);
  let activeOut = "true";

  if (active) {
    color = activeCol;
    activeOut = "false";
  } else {
    color = col;
    activeOut = "true";
  }

  return (
    <svg
      active={activeOut}
      style={{
        userSelect: "none",
        cursor: "pointer",
        background: "none",
        position: "absolute",
        right: ".5vw",
        borderRadius: "0vw",
        marginTop: ".5vw",
      }}
      height="1.8vw"
      width="1.8vw"
      onMouseDown={() => {
        mouseDown();
        active ? setActive(false) : setActive(true);
      }}
    >
      <text style={{ fontSize: "1.4vw" }} fill={color} x="25%" y="78%">
        ?
      </text>
      <rect
        x={"5%"}
        y={"12%"} //array [x,y]
        width="86%"
        height="86%"
        fill="none" //string
        stroke={color} //string
        strokeWidth=".05vw"
        rx={0}
        style={{ userSelect: "none" }}
      />
    </svg>
  );
};

function App() {
  //hook that makes sure dom is rerendered if a button is clicked, even if theNpv hasn't changed
  const [npvRan, setNpvRan] = React.useState(0);
  calcData.testVar = npvRan;

  function rorInput() {
    function percentBox() {
      return (
        <input
          style={{
            position: "absolute",
            // background: "none",
            width: "3.1vw",
            // height: "2.6vw",
            top: "-.4vw",
            left: "7.4vw",
            fontSize: "1.1vw",
            borderWidth: ".05vw",
            color: styles.lightBlue,
          }}
          key={"rorinput"}
          value={calcData.r}
          type="text"
          name={"ror"}
          onChange={(event) => {
            if (event.target.value < 0) {
              calcData.r = 0;
            } else if (event.target.value > 100) {
              calcData.r = 100;
            } else {
              calcData.r = event.target.value;
            }
            calcData.discountFactor = rndNearTenth(1 / (1 + calcData.r / 100));
            findNPV(calcData.cashFlows, calcData.r, calcData.initialInvest);
          }}
        />
      );
    }

    return (
      <div style={DRateText}>
        RATE OF RETURN:{percentBox()}
        <p
          style={{
            fontSize: "1.3vw",
            position: "absolute",
            top: "-2vw",
            left: "11vw",
            color: styles.lightBlue,
          }}
        >
          %
        </p>
      </div>
    );
  }

  function handleCashFlowChange() {
    calcData.allNpvPoints = [];
    calcData.highestFlow = 0;
    //set highest flow
    for (let flow in calcData.cashFlows) {
      let value = parseFloat(calcData.cashFlows[flow]);
      if (value < 0) {
        value *= -1;
      }
      if (value > calcData.highestFlow) {
        calcData.highestFlow = value;
      }
    }

    let yearZero = removeCommas(calcData.cashFlows[0]);
    calcData.initialInvest = yearZero;
    //find the npv for every point between 1 and 100
    for (let i = 0; i <= 100; i++) {
      let npvOut = null;
      let rDec = i / 100;
      let npv = null;
      for (let flow = 1; flow < calcData.cashFlows.length; flow++) {
        let cashFlow = removeCommas(calcData.cashFlows[flow]);
        let powerOf = parseInt(flow);
        let discountedFlow = cashFlow / Math.pow(1 + rDec, powerOf);
        npv += discountedFlow;
      }
      npvOut = Math.round((npv + yearZero) * 100) / 100;
      calcData.allNpvPoints.push([i, npvOut]);
    }

    findNPV(calcData.cashFlows, calcData.r);
    calcData.npvSnap = [];
  }
  function minusButton(value) {
    return (
      <svg
        style={{
          cursor: "pointer",
          background: styles.canvasColor,
          position: "absolute",
          left: "10.8vw",
          borderRadius: "0vw",
          marginTop: "0vw",
        }}
        height="1.2vw"
        width="1.2vw"
        onMouseDown={() => {
          calcData.cashFlows.splice(value, 1);
          handleCashFlowChange();
        }}
      >
        {/* <circle style={minusButtonStyle} cx="56%" cy="50%" r="32%" /> */}
        <line
          stroke={styles.darkGray}
          strokeWidth=".1vw"
          x1="30%"
          y1="70%"
          x2="70%"
          y2="30%"
        />
        <line
          stroke={styles.darkGray}
          strokeWidth=".1vw"
          x1="70%"
          y1="70%"
          x2="30%"
          y2="30%"
        />
      </svg>
    );
  }

  const [helpBlurb, setHelpBlurb] = React.useState([]);

  let helpButtonAction = () => {
    if (helpButton.props.active === "false") {
      setHelpBlurb([]);
    } else {
      setHelpBlurb(
        <div
          className="container"
          style={{
            position: "absolute",
            borderRadius: styles.boxRadius,
            color: "styles.lightCanvasColor",
            background: "none",
            right: "2.5vw",
            opacity: 1,
            top: "1vw",
            width: "21.5vw",
            height: "10vw",
          }}
        >
          <img style={{ position: "absolute" }} src={bubble} />
          <div
            style={{
              margin: 0,
              padding: 0,
              background: "none",
              fontSize: "1vw",
              top: ".2vw",
              fontWeight: "bold",
              left: "2%",
              color: styles.lightCanvasColor,
              position: "absolute",
              width: "92%",
            }}
          >
            {help.header}
          </div>
          <div
            style={{
              margin: 0,
              padding: 0,
              background: "none",
              fontSize: "1vw",
              top: "1.8vw",
              left: "2%",
              color: styles.lightCanvasColor,
              position: "absolute",
              width: "92%",
            }}
          >
            {help.text}
          </div>
          <a
            style={{
              margin: 0,
              padding: 0,
              background: "none",
              fontSize: "1.2vw",
              fontWeight: "bold",
              bottom: "1.4vw",
              left: "28%",
              color: styles.lightCanvasColor,
              position: "absolute",
              width: "92%",
            }}
            href={help.link}
            target="_blank"
          >
            WATCH VIDEO
          </a>
        </div>
      );
    }
  };

  let helpButton = HelpButton(helpButtonAction);

  // function autoButton() {
  //   return (
  //     <div>
  //       <button onClick={() => { calcData.irr = Math.round((findIRR(calcData.cashFlows, calcData.initialInvest)[0]) * 100) / 100; setNpvRan(npvRan + 1) }}>AUTO IRR</button>
  //       <p>irr:{calcData.irr}</p>
  //     </div>
  //   )
  // }

  function plotButton() {
    let buttonStyle = {
      canvasWidth: "13%",
      canvasHeight: "2.6%",
      canvasPadLeft: "10.6%",
      canvasPadTop: "88%",
      btnColor: styles.gray,
      btnStrokeColor: "none",
      btnStrokeWidth: 1,
      btnRadius: 3,
      btnDisplay: "SHOW POINT ON GRAPH",
      btnFontSize: 7,
      btnFontColor: styles.lightCanvasColor,
      btnFontWeight: "medium",
      btnTextRange: [9.5, 12.2],
    };

    let mouseDown = () => {
      if (calcData.theNPV) {
        calcData.npvSnap.unshift([Number(calcData.r), Number(calcData.theNPV)]);
        setNpvRan(npvRan + 1);
      }
    };
    return FlexButton("plotButton", buttonStyle, mouseDown);
  }

  function addMoreButton() {
    let buttonStyle = {
      canvasWidth: "60%",
      canvasHeight: "12%",
      canvasPadLeft: "20%",
      canvasPadTop: "39%",
      btnColor: styles.gray,
      btnStrokeColor: "none",
      btnStrokeWidth: 1,
      btnRadius: 4,
      btnDisplay: "ADD MORE",
      btnFontSize: 10,
      btnFontColor: styles.lightCanvasColor,
      btnFontWeight: "medium",
      btnTextRange: [25, 13],
    };

    let mouseDown = () => {
      calcData.cashFlows.push(0);
      handleCashFlowChange();
    };
    return FlexButton("addmoreButton", buttonStyle, mouseDown);
  }

  function CashFlowContents() {
    let contents = [];
    for (let value in calcData.cashFlows) {
      let color = styles.positiveColor;

      if (calcData.cashFlows[value] < 0) {
        color = styles.negativeColor;
      }
      contents.push(
        <div key={"cashflow" + value}>
          <div style={cashContents}>
            {dollSymbol(parseInt(value), color)}
            <input
              style={{
                position: "absolute",
                background: "none",
                width: "8vw",
                height: "2.6vw",
                left: "2vw",
                fontSize: "1.8vw",
                border: "none",
                color: color,
              }}
              key={"cashflow" + value}
              value={calcData.cashFlows[value]}
              type="text"
              name={value + "cashFlow"}
              onChange={(event) => {
                calcData.cashFlows[value] = event.target.value;
                handleCashFlowChange();
              }}
            />
            {minusButton(value)}
          </div>
          <div style={lineBreak} />
        </div>
      );
    }
    return contents;
  }

  function DiscountRateSlider() {
    return (
      <input
        type="range"
        min="0"
        max="100"
        step={1}
        style={sliderStyle}
        value={calcData.r}
        name="ROR"
        onChange={(event) => {
          calcData.r = parseFloat(event.target.value).toFixed(2);
          calcData.discountFactor = rndNearTenth(1 / (1 + calcData.r / 100));
          findNPV(calcData.cashFlows, calcData.r, calcData.initialInvest);
        }}
      />
    );
  }

  return (
    <div style={calcCanvas}>
      {drawArrows()}
      <p style={calcTitle}>NET PRESENT VALUE CALCULATOR</p>

      <div style={cashFlowBox}>
        <p style={header1}>CASH FLOWS</p>
        <div style={innerCashBox}>{CashFlowContents()}</div>
        <div style={cashBottom}>{addMoreButton()}</div>
      </div>

      <div style={dRateBox}>
        {rorInput()}
        {DiscountRateSlider()}
        <p style={DFactorText}>DISCOUNT FACTOR: {calcData.discountFactor}</p>
      </div>

      <div style={sketchBox}>
        <p style={header1}>CASHFLOWS AT PRESENT VALUE</p>
        <Sketch />
      </div>

      <div style={NpvStatBox}>
        <p style={header1}>NET PRESENT VALUE</p>
        <div>{npvResult()}</div>
        <p style={header1}>AVG NPV PER PERIOD</p>
        <p style={avgNPVHeader}>{dollarFormat(calcData.avgNpvYr)}</p>
        <div style={{ position: "absolute", top: "36%" }}>{JellyJar()}</div>
        {jellyDisplay()}
      </div>

      <div style={graphBox}>
        <p style={header1}>RATE OF RETURN V. NPV GRAPH</p>

        {Graph()}
      </div>
      {plotButton()}
      {helpButton}
      {helpBlurb}
    </div>
  );

  function findNPV(cashFlows, r) {
    // setHelpBlurb([]);
    //ensures DOM will update even if npv didnt change
    setNpvRan(npvRan + 1);
    let yearZero = removeCommas(cashFlows[0]);
    let npvOut = null;
    let rDec = r / 100;
    let npv = null;
    //reset modded cash flows
    calcData.modCashFlows = [];
    calcData.modCashFlows.push(yearZero);
    calcData.initialInvest = yearZero;
    for (let flow = 1; flow < cashFlows.length; flow++) {
      let cashFlow = removeCommas(cashFlows[flow]);
      let powerOf = parseInt(flow);
      let discountedFlow = cashFlow / Math.pow(1 + rDec, powerOf);
      calcData.modCashFlows.push(discountedFlow);
      npv += discountedFlow;
    }
    npvOut = Math.round((npv + yearZero) * 100) / 100;
    calcData.avgNpvYr = (npvOut / cashFlows.length).toFixed(2);
    calcData.theNPV = npvOut.toFixed(2);
  }
}

export default App;
