
d3.json("https://raw.githubusercontent.com/ricardo-ayres/pynabe-sugano/master/diagrams/d6.json"
).then(function(table) {

    var d_electrons, diagram, states,g_state,e_state,chars,verbose,ratio;


function help(){
    console.log("Usage: pynabe-sugano.py -d [electrons] -v1 [wavenumber] [excited state]-[ground state] -v2 [wavenumber] [excited state]-[ground state]");
    console.log("Example:./pynabe-sugano.py -d 6 -v1 467 1t1g-1a1g -v2 333 1t2g-1a1g --use-nm");
    console.log("Parameters:"+
    "-d      Number of d electrons in the complex (determines what diagram to use)"+
    "-v1     Lower energy peak value in cm^-1 followed by the transition. (can take wavelenght if --use-nm is used)"+
    "-v2     Higher energy peak value in cm^-1 followed by the transition. (can take wavelenght if --use-nm is used)"+
    "Transitions are specified with the excited state followed by the ground state and separated by a '-'. See example above.");
};

function about(){
    console.log("Pynabe-sugano is a calculator for Tanabe-Sugano diagrams"  +
    "Pynabe-sugano  Copyright (C) 2015  Ricardo B. Ayres"+  
"This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version."+
"This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details."+
"You should have received a copy of the GNU General Public License along with this program. "
    )
    }    



function get_diagram(d_electrons){

        diagram = (table);
        return diagram
}

function list_states(diagram){
    states = Object.keys(diagram);
    if ('deltaB' in states){
        states.remove('deltaB')
    }
    console.log("Available states in this diagram are: ")
    for (state in states){
        console.log(state)
    }
    console.log("\n\nFor more information refer to:\nhttps://en.wikipedia.org/wiki/Tanabe%E2%80%93Sugano_diagram#Tanabe-Sugano_diagrams")
}

function parse_transition(diagram, transition){
    var g_state = ""
    var e_state = ""
    chars=transition;
    for (i = 0; i < (chars.length); i++)
    {
        if (chars[i] == '-'){  
            var value = i - 1;
            if (value < 0){ value = 0;}
            // e_state = e_state + chars[:i:]
            e_state = e_state + chars.slice(0,value + 1);
            g_state = g_state + chars.slice(i+1);
            break
        }
    }
    if (g_state[0] == e_state[0]){
        parity=true;
    }
    else{
        parity=false;
    }   

    found_g = false; 
    found_e = false;
    myArray = (Object.keys(diagram))
    for (i = 0; i < (myArray.length); i++){
        state = myArray[i]
        if (g_state.toLowerCase() == state.toLowerCase()){
            g_state = state
            found_g = true
        }
        if (e_state.toLowerCase() == state.toLowerCase()){
            e_state = state
            found_e = true
        }
    }
    if (found_g && found_e){
        transition=[e_state, g_state];
        console.log([transition,parity]);
        answer = [transition, parity]
        return answer
        
    }
    else{
        console.log("Transition not found!")
        console.log("Use -d [electrons] -ls to list transitions.")
        console.log("Aborting.")
    }
}

function deltaOctB(ratio, diagram, tv1, tv2){

    delta_list = diagram['deltaB']
    e2_state = diagram[tv2[0]]
    e1_state = diagram[tv1[0]]
    ground_state = diagram[tv1[1]]
    
    var h2B = []
    var h2B_o = []    
    var h1B = []
    var h1B_o = []
    var Ev1_B = []
    var Ev2_B = []
    var y = []
    var yo = []
    var x = []
    var xo = []
    var delta_B = []

    current_ratio = 0
    index = 0
    for (i = 0; i < (delta_list.length); i++) {
        delta = delta_list[i]
        previous_ratio = current_ratio
        if (e1_state[index] != 0){
            current_ratio = e2_state[index]/e1_state[index]
            }
        else{
            current_ratio = 0
            }
        if (index > 0){
            previous_delta = delta_list[index-1]
            }
        else{
            previous_delta = delta
            }
            
        if (verbose == 2){
            if (index == 0){
                console.log("Searching for interval that contains Ev2/Ev1 "+ ratio.toFixed(3) )
            }
                console.log("[" + previous_ratio.toFixed(3), + current_ratio.toFixed(3)+"]" )      
            }
        if (verbose == 2 && ground_state[index] != 0){
            console.log("<-- Ground state is not zero, skipping.")
            }
                
        if ( ((ratio < current_ratio && ratio > previous_ratio) || (ratio > current_ratio && ratio < previous_ratio)) && (ground_state[index] == 0)){
            if (verbose == 2){
                console.log("<-- Found!")
                }
            x.push(delta)
            xo.push(previous_delta)
            y.push(current_ratio)
            yo.push(previous_ratio)
            h2B.push(e2_state[index])
            h2B_o.push(e2_state[index-1])
            h1B.push(e1_state[index])
            h1B_o.push(e1_state[index-1])
            }
                
        if (verbose == 2){
            console.log("")
            }
        index = index + 1;
    }


    for (i = 0; i < (x.length); i++){  

    m_ratio = (y[i]-yo[i])/(x[i]-xo[i])
    delta_B.push(((ratio - yo[i])/m_ratio) + xo[i])
    
    m_h2 = (h2B[i]-h2B_o[i])/(x[i]-xo[i])
    m_h1 = (h1B[i]-h1B_o[i])/(x[i]-xo[i])
    Ev2_B.push((m_h2*(delta_B[i]-xo[i]))+h2B_o[i])
    Ev1_B.push((m_h1*(delta_B[i]-xo[i]))+h1B_o[i])
    
    }

return [delta_B, Ev1_B, Ev2_B]
    }
     
// Entry Point 
var verbose = 1
var use_nm = false
var v1=467
var v2=333
var tv1="1t1g-1a1g"
var tv2="1t2g-1a1g"
var d_electrons='d6'



if (d_electrons && v1 && v2 && tv1 && tv2){
    d_electrons = parseInt(d_electrons)
    diagram = get_diagram(d_electrons)
    v1=parseFloat(v1)
    v2=parseFloat(v2)
    if (use_nm){
        Ev1 = Math.round(((10**7)/v1))
        Ev2 = Math.round(((10**7)/v2))
    }
    else{
        Ev1 = v1
        Ev2 = v2
    }
    if (Ev1 > Ev2){
        a = Ev2
        Ev2 = Ev1
        Ev1 = a  
    }

    tv1 = parse_transition(diagram, tv1)[0]
    p1 = true

    if (p1){
        p1 = "spin-allowed.";
    }
    else{
        p1 = "spin-forbidden."
    }
    
    tv2 = parse_transition(diagram, tv2)[0]
    p2 = true

    if (p2){
        p2 = "spin-allowed."
    }
    else{
        p2 = "spin-forbidden."
    }
    if (tv1[1] != tv2[1]){
        console.log("Ground states are not the same. Aborting.")
        sys.exit(0)
    }
     
    if (verbose){
        console.log ("Using diagram for " + d_electrons + " complex" )
        console.log("Ev1 wavenumber is " + + Ev1 +" cm^-1" )
        console.log("Ev2 wavenumber is " + + Ev2 +" cm^-1")
        console.log("Transition " +tv1[0] +" <- " +tv1[1] + " is " + (tv1[0], tv1[1], p1))
        console.log("Transition " +tv2[0] +" <- " +tv2[1] +  " is " +(tv2[0], tv2[1], p2))
        console.log("Ev2/Ev1 ratio is " + ((Ev2/Ev1)).toFixed(3))
    }

    }

else{
    help()
}



ratio = Ev2/Ev1

if (verbose){
    console.log("Calculating ...")
}

result = deltaOctB(ratio, diagram, tv1, tv2)
var delta_B = result[0]
var Ev1_B = result[1]
var Ev2_B = result[2]

var B=[]
var E10Dq=[]

for (i = 0; i < (delta_B.length); i++){  
    B1 = Ev1/Ev1_B[i]
    B2 = Ev2/Ev2_B[i]
    B.push((B1+B2)/2)
    E10Dq.push(delta_B[i]*B[i])
}

if ((E10Dq.length) == 0){
    console.log("No matches found! Ratio might be out of diagram range. Use --verbose for more information.")
}

if ((E10Dq.length) != 1){
    console.log("More than one match found!")
    console.log("Printing all " + (E10Dq.length) + " matches:" )
}

for (i = 0; i < (E10Dq.length); i++){  
    if ((E10Dq.length) != 1){
    console.log("Match " + (i+1)) 
    console.log("10Dq/B is " + delta_B[i])
    console.log("Ev1/B is " + Ev1_B[i]  + " and Ev2/B is " + Ev2_B[i])
    console.log("B Racah parameter is " + B[i])
    console.log("10Dq is " + E10Dq[i])

    }

}


});