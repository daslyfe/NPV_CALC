  
function findIRR(cashFlows, initialInv) {
  
    const maxTries = 1000;
    let delta = 1;
    
    let guess = 50;
    const multiplier = NPV(cashFlows, guess, initialInv) > 0 ? 1 : -1;
    let i = 0;

    function NPV(cashFlows, r, initialInv) {
        let npvOut = null;
        let rDec = r/100;
        let npv = null;
        
        //reset modded cash flows
        for (let flow in cashFlows) {
            let powerOf=parseInt(flow) +  1;
            let discountedFlow = cashFlows[flow] / Math.pow(1 + rDec,  powerOf);
            npv += discountedFlow;
        }
        npvOut = (npv - initialInv);
        return (npvOut);
    }
    
    while ( i < maxTries ) {
       
        
        const guessedNPV = NPV(cashFlows, guess ,initialInv);
        console.log("try#  " + i)
        console.log("multiplier " + multiplier); 
        console.log("guess " + guess);
        console.log("guessed npv" + guessedNPV);
        console.log("delta " + delta);
        let multipliedNPV = guessedNPV * multiplier
        if (multipliedNPV > 0) {
            //add the delta, change the size of the guess exponentially depending on how far away it si from zero
            if (delta > .01) {
                delta = Math.pow(multipliedNPV * .01, 2);
            }
            guess += (multiplier * delta);
            i += 1;
        }
        //break if NPV crosses zero
        else break;   
    }
    return [i === maxTries ? "irr has divergerged" : guess, i];
    // return (NPV(cashFlows, 0, initialInv));
}
   

export default findIRR;