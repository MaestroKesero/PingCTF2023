
xd = [107,184,149,238,45,243,151,49,85,131,95,44,57,108,90,60,92,32,245,29,35,59,164,147,89,129,228,144,1,58,43,122,246,63,130,33,5,13,145,111,176,68,124,91,236,207,21,87,160,196,179,183,126,114,153,116,25,69,54,40,203,20,10,253,136,80,232,22,106,175,51,86,83,31,193,18,72,132,142,16,204,152,180,185,217,100,181,78,47,102,223,159,52,211,242,172,188,75,50,229,156,133,206,155,201,154,178,254,34,230,134,115,200,209,94,48,162,195,240,210,244,165,182,222,174,66,121,247,218,221,98,225,140,15,104,138,17,146,84,11,227,23,117,88,12,26,197,148,189,141,39,119,137,177,112,139,56,105,249,239,73,150,198,224,163,158,30,93,234,226,110,205,252,125,199,96,187,7,81,192,169,208,215,186,2,251,237,202,3,71,213,37,76,28,46,82,214,79,113,123,77,190,161,67,103,36,143,191,24,255,135,74,97,168,241,99,42,4,101,41,53,235,120,220,65,64,19,212,6,171,194,219,8,9,233,166,231,109,167,14,157,128,62,216,70,170,27,38,55,248,250,118,61,173,127,0]
function opcodeSbox(opcode) {
    return xd[opcode]  
}

function encryptIns(ins, i) {
    s = ((i*3865753504)|(i*7182987231)) & 0xffffffff;
    s ^= ins
    if (s < 0) s = (2**32)+s;
    return s;
}

function emitMov(reg, reg1) {
    return opcodeSbox(reg) | reg1 << 8
}

function emitSetConst(reg, iconst) {
    return opcodeSbox(0x10+reg) | iconst << 8
}

function emitOP2(reg, reg1, OP, reg2) {
    var ops = ["BITXOR", "BITAND", "BITRSHIFT", "BITLSHIFT", "BITOR", "ADD", "MINUS", "MULTIPLY", "EQ", "LT", "GT", "DIVIDE","CONCAT","RIGHT","LEFT"]
    return opcodeSbox(0x20+reg) | ops.indexOf(OP) << 8 | reg1 << 16 | reg2 << 24
}

function emitOP1(reg, OP, reg1) {
    var ops = ["CODE","CHAR","SQRT","SIGN","LEN","ENCODEURL","BAHTTEXT"]
    return opcodeSbox(0x30+reg) | ops.indexOf(OP) << 8 | reg1 << 16
}


function emitSaveMEM(reg1, reg2) {
    return opcodeSbox(0xf) | reg1 << 8 | reg2 << 16
}


function emitLoadMEM(reg, reg1) {
    return opcodeSbox(0x40 + reg) | reg1 << 8
}

function emitLoadCELL(reg, reg1,reg2) {
    return opcodeSbox(0x50 + reg) | reg1 << 8 | reg2 << 16
}

function emitJMPT(reg, destination) {
    return {"type": "JMPT", condition: reg, label: destination}
}

function emitJMP(destination) {
    return {"type": "JMP", label: destination}
}

var code = [



    
    emitLoadMEM(2, 0), // reg2 - flag
    emitSetConst(1, 1),  // reg0 - iterator
    emitSetConst(5, 255), 
    emitSetConst(6, 31337), //hash
    emitSetConst(7, 0xffff), //hash const
    emitSetConst(8, 8),
    emitOP1(3, "LEN", 2),


    "loop",
    emitOP2(4, 0, "ADD", 1), 
    emitOP2(4, 2, "LEFT", 4),
    emitOP2(4, 4, "RIGHT", 1),
    emitOP1(4, "CODE", 4),
    emitOP2(6, 6, "MULTIPLY", 4),
    emitOP2(6, 6, "BITAND", 7),
    emitOP2(4, 4, "BITXOR", 5),
    emitOP2(6, 6, "BITXOR", 4),
    emitOP2(4, 4, "MINUS", 3),
    emitSetConst(7, 75),
    emitOP1(5, "CHAR", 7),
    emitSetConst(7, 8),
    emitOP2(4, 4, "ADD", 7),
    emitLoadCELL(4, 5, 4),
    emitSetConst(5, 255),
    emitOP2(4, 4, "BITAND", 5),
    emitSetConst(7, 0xffff),

    emitSaveMEM(0, 4), 
    emitOP2(0, 0, "ADD", 1), 
    emitOP2(4, 0, "LT", 3), 
    emitJMPT(4, "loop"),


    emitSetConst(0, 0),
    emitSetConst(9, 0xffff),
    "loop2",

    emitOP2(7, 0, "ADD", 1),
    emitLoadMEM(4, 0),
    emitLoadMEM(7, 7),
    emitOP2(7, 7, "BITLSHIFT", 8),
    emitOP2(7, 7, "BITOR", 4), 
    emitMov(5, 7), 
    emitOP2(7, 7, "BITXOR", 6), 
    emitOP2(5, 5, "MULTIPLY", 6), 
    emitOP2(5, 5, "BITXOR", 6), 
    emitOP2(6, 5, "BITAND", 9),
    emitOP2(2, 0, "BITRSHIFT", 1),
    emitOP2(2, 2, "ADD", 1),
    emitOP2(2, 2, "ADD", 3),
    emitSaveMEM(2, 7), 
    



    emitOP2(0, 0, "ADD", 1), 
    emitOP2(0, 0, "ADD", 1), 
    emitOP2(4, 0, "LT", 3), 
    emitJMPT(4, "loop2"),



    emitSetConst(2, 0),
    emitOP2(2, 2, "ADD", 1),
    emitOP2(2, 2, "ADD", 3),

    emitOP2(3, 3, "ADD", 1), 
    emitOP2(3, 3, "BITRSHIFT", 1),

    

    emitSetConst(0, 0),
    emitSetConst(6, 1337),
    "loop3",

    emitOP2(4, 2, "ADD", 0), 
    emitLoadMEM(5, 4),

    emitOP1(5, "BAHTTEXT", 5),
    emitOP1(5, "ENCODEURL", 5),
    emitOP2(5, 5, "CONCAT", 0),
    emitOP2(6, 6, "CONCAT", 5),


    emitOP2(0, 0, "ADD", 1), 
    emitOP2(4, 0, "LT", 3), 
    emitJMPT(4, "loop3"),

    emitMov(0, 6),
    emitMov(0, 6)


]

var seg = 0

var segments = []
var segment = []


for(var i = 0; i < code.length; i++) {
    if(segment.length > 2 || i == code.length-1) {
        segment = [`SEGMENT${seg}`, ...segment]
        if(i != code.length-1) {
            segment.push(emitJMP(`SEGMENT${seg+1}`))
        } else {
            segment.push(emitMov(12,12))
        }
        segments.push(segment)
        segment = []
        seg++
    }
    segment.push(code[i])
}

var lookup = [219,32,212,59,87,101,248,194,92,157,224,54,9,232,121,207,140,240,186,133,214,72,128,238,84,241,116,38,37,139,100,28,78,0,130,183,82,188,12,95,53,178,104,119,213,204,245,118,13,93,88,198,247,34,102,67,153,46,2,21,161,55,246,36,123,132,109,23,155,169,1,30,52,164,189,61,89,129,24,148,112,76,31,126,22,77,17,218,15,223,210,146,107,105,182,33,206,253,184,124,190,43,173,65,26,239,40,7,159,98,75,162,193,18,154,44,231,235,68,192,237,150,160,4,20,66,137,243,151,202,222,158,138,39,45,58,175,115,48,252,156,227,94,50,106,187,81,83,47,197,69,103,90,11,91,195,254,62,74,149,60,71,70,163,108,145,8,134,142,250,3,176,200,25,143,166,117,203,181,10,80,171,49,201,51,236,63,42,255,209,6,152,73,167,217,111,5,226,56,170,14,242,244,179,27,177,122,185,208,228,216,180,131,147,233,64,16,251,114,41,99,234,230,196,125,225,199,211,120,172,136,113,168,215,220,144,191,19,229,141,96,57,165,85,35,79,174,97,110,221,205,127,249,86,135,29]

segments = segments.sort((a, b) => 0.5 - Math.random());

code = [emitJMP(`SEGMENT0`),...segments.reduce((a,b)=>a=[...a,...b])]

var newCode = []

for(var i = 0; i < code.length; i++) {
    newCode.push(code[i])
    if(Math.random()>0.75) {
        g = ~~(Math.random()*5)+1
        newCode.push(emitSetConst(1, g+1))
        newCode.push(emitOP2(12, 12, "ADD", 1))
        for(var j = 0; j < g; j++) {
            newCode.push(~~(Math.random()*0xffffffff))
        }
        newCode.push(emitSetConst(1, 1))
    }
    
}

code = newCode

var labels = {}
ip = 1;
for(var i = 0; i < code.length; i++) {
    if(typeof code[i] == "string") {
        labels[code[i]] = ip
    } else {
        ip++
    }
}


var outCode = [] 

var IP = 0;
for(var i = 0; i < code.length; i++) {
    if(code[i].type == "JMPT") {
        code[i] = opcodeSbox(0xe) | code[i].condition << 8 | (labels[code[i].label]+256) << 16
    }
    if(code[i].type == "JMP") {
        code[i] = opcodeSbox(0x10+12) | (labels[code[i].label]+256) << 8
    }
    if(typeof code[i] == "number") {
        outCode.push(encryptIns(code[i], outCode.length+1))
        if(i == 0) {
            outCode.push(...(lookup.map(a=> ((Math.random()*0x7fffff) << 8) | a)))
        }
    }
}

console.log(outCode.join("\n"))