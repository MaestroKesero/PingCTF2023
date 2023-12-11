

xd = [107,184,149,238,45,243,151,49,85,131,95,44,57,108,90,60,92,32,245,29,35,59,164,147,89,129,228,144,1,58,43,122,246,63,130,33,5,13,145,111,176,68,124,91,236,207,21,87,160,196,179,183,126,114,153,116,25,69,54,40,203,20,10,253,136,80,232,22,106,175,51,86,83,31,193,18,72,132,142,16,204,152,180,185,217,100,181,78,47,102,223,159,52,211,242,172,188,75,50,229,156,133,206,155,201,154,178,254,34,230,134,115,200,209,94,48,162,195,240,210,244,165,182,222,174,66,121,247,218,221,98,225,140,15,104,138,17,146,84,11,227,23,117,88,12,26,197,148,189,141,39,119,137,177,112,139,56,105,249,239,73,150,198,224,163,158,30,93,234,226,110,205,252,125,199,96,187,7,81,192,169,208,215,186,2,251,237,202,3,71,213,37,76,28,46,82,214,79,113,123,77,190,161,67,103,36,143,191,24,255,135,74,97,168,241,99,42,4,101,41,53,235,120,220,65,64,19,212,6,171,194,219,8,9,233,166,231,109,167,14,157,128,62,216,70,170,27,38,55,248,250,118,61,173,127,0]
function opcodeSbox(opcode) {
    return xd[opcode]  
}


for(var register = 0; register <= 12; register++) {

var instruction = `BITXOR(INDIRECT("K"&(6+X2)),BITAND(BITOR(X2*3865753504,X2*7182987231),2^32-1))`

var operand1 = `BITRSHIFT(BITAND(${instruction},65280),8)`

var operand2 = `BITRSHIFT(BITAND(${instruction},16711680),16)`

var operand3 = `BITRSHIFT(BITAND(${instruction},4278190080),24)`

var CONST24bit = `BITRSHIFT(BITAND(${instruction},4294967040),8)`

var CONST16bit = `BITRSHIFT(BITAND(${instruction},4294901760),16)`

var operand1REG = `INDIRECT(CHAR(76+${operand1})&"2")`

var operand2REG = `INDIRECT(CHAR(76+${operand2})&"2")`

var operand3REG = `INDIRECT(CHAR(76+${operand3})&"2")`


handlermov = `INDIRECT(CHAR(76+${operand1})&"2")`

handlerSET_CONST = `${CONST24bit}`

var ops = ["BITXOR", "BITAND", "BITRSHIFT", "BITLSHIFT", "BITOR", "ADD", "MINUS", "MULTIPLY", "EQ", "LT", "GT", "DIVIDE","CONCAT","RIGHT","LEFT"]
var handlers2 = []
for(var i in ops) {
    handlers2.push(`${i},${ops[i]}(${operand2REG},${operand3REG})`)
}

handlerOPERATION2 = `SWITCH(${operand1},${handlers2.join(",")})`




var ops = ["CODE","CHAR","SQRT","SIGN","LEN","ENCODEURL","BAHTTEXT"]
var handlers1 = []
for(var i in ops) {
    handlers1.push(`${i},${ops[i]}(${operand2REG})`)
}


handlerOPERATION1 = `SWITCH(${operand1},${handlers1.join(",")})`


handlerloadMEM = `INDIRECT("L"&(5+${operand1REG}))`
handlerloadCELL = `INDIRECT(${operand1REG}&${operand2REG})`

if(register == 10) {
    handlerSaveMemory = `${operand2REG}`
}
if(register == 11) {
    handlerSaveMemory = `1+BITLSHIFT(${operand1REG}, 1)` 
}

handlerJMPT = `IF(${operand1REG},${CONST16bit},X2+1)` 

var out = `=IF(G6=0,0,SWITCH(BITAND(${instruction},255),${opcodeSbox(register)},${handlermov},${opcodeSbox(0x10 + register)},${handlerSET_CONST},${opcodeSbox(0x20 + register)},${handlerOPERATION2},${opcodeSbox(0x30 + register)},${handlerOPERATION1},${opcodeSbox(0x40 + register)},${handlerloadMEM},${opcodeSbox(0x50 + register)},${handlerloadCELL}${register == 11 || register == 10 ? `,${opcodeSbox(0x0f)},${handlerSaveMemory}` : ""}${register == 12 ? `,${opcodeSbox(0x0e)},${handlerJMPT}` : ""},${register == 11 || register == 10 ? "0" : (register == 12 ? "X2+1" : (String.fromCharCode(76+register)+"2"))}))`
console.log("REGISTER ", register)
console.log(out)
console.log("\n\n")

}





