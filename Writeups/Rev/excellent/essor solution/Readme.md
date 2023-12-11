The excel file is virtual machine with 13 registers and small memory decoded bytecode:

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
    
    
Solution script in solution file.
Excel formulas generator in generator file.
Byte code generator in bytegenerator file.


    
    
    
    
