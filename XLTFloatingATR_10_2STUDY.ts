def AvgTrueRange1;
def AvgTrueRange2;
def AvgTrueRange3;


input length = 14;
AvgTrueRange1 = Average(TrueRange(high,  close,  low),  length);
AvgTrueRange2 = AvgTrueRange1 / 10;
AvgTrueRange3 = AvgTrueRange1 / 50    ;


AddLabel(yes, Concat("ATR: ", Concat(AvgTrueRange1, Concat("    ATR/10%: ", Concat(AvgTrueRange2, Concat("    ATR/2%: ", AvgTrueRange3))))), Color.BLACK);