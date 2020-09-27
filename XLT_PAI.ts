# Author: Bobby Fu
# Date: Nov-18-2018
# 
input demandZone = 0;

def periodText = 1;
# Daily Average True Range
def dATR = ATR(14);
def EMA20 = MovingAverage(AverageType.EXPONENTIAL, close, 20);
def BBSDev = StDev(close, 20);
def UpperBand = EMA20 + (2 * BBSDev);
def LowerBand = EMA20 - (2 * BBSDev);
def isDailyChart = GetAggregationPeriod() == AggregationPeriod.DAY;
def isWeeklyChart = GetAggregationPeriod() == AggregationPeriod.WEEK;
def isMonthlyChart = GetAggregationPeriod() == AggregationPeriod.MONTH;
def isWeeklyOrMonthly = isWeeklyChart or isMonthlyChart;

plot ema20Line = EMA20;
plot willingSellLine;
if (isWeeklyOrMonthly) {
    willingSellLine = EMA20 - dATR;
} else {
    willingSellLine = EMA20;
}
plot upperLine;
if (isWeeklyOrMonthly) {
    upperLine = UpperBand;
} else {
    upperLine = EMA20;
}
plot lowerLine;
if (isWeeklyOrMonthly) {
    lowerLine = LowerBand -dATR;
} else {
    lowerLine = EMA20;
}

#plot wssLine = EMA20 - (dATR * 1.681);