input aggregationPeriod = AggregationPeriod.DAY;
input length = 1;
input displace = -1;
input showOnlyLastPeriod = no;

plot PrevDayClose;
if showOnlyLastPeriod and !IsNaN(close(period = aggregationPeriod)[-1]) {
    PrevDayClose = Double.NaN;
} else {
    PrevDayClose = Highest(close(period = aggregationPeriod)[-displace], length);
}
