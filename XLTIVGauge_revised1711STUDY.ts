declare lower;

input hide_HV = Yes;
input show_labels = No;
input show_band_colors = No;
input show_Section12_breakdown = No;
input lightbackground = Yes;
plot IV = ImpVolatility();
plot HV = HistoricalVolatility(30);

plot HV52WkHigh = Highest(HV, 252);
plot HV52WkLow = Lowest(HV, 252);
plot Level80Pct = HV52WkLow + (((HV52WkHigh - HV52WkLow) / 5) * 4);
plot Level60Pct = HV52WkLow + (((HV52WkHigh - HV52WkLow) / 5) * 3);
plot Level40Pct = HV52WkLow + (((HV52WkHigh - HV52WkLow) / 5) * 2);
plot Level20Pct = HV52WkLow + ((HV52WkHigh - HV52WkLow) / 5);

plot Level30Pct = (Level20Pct + Level40Pct) / 2;
plot Level10Pct = (Level20Pct + HV52WkLow) / 2;

def section = if (IV >= HV52WkHigh) then 6
else if (IV < HV52WkLow) then 0
else if (IV >= HV52WkLow and IV < Level10Pct) then 1.1
else if (IV >= Level10Pct and IV < Level20Pct) then 1.2
else if (IV >= Level20Pct and IV < Level30Pct) then 2.1
else if (IV >= Level30Pct and IV < Level40Pct) then 2.2
else if (IV >= Level40Pct and IV < Level60Pct) then 3
else if (IV >= Level60Pct and IV < Level80Pct) then 4
else if (IV >= Level80Pct and IV < HV52WkHigh) then 5
else 99;

def percentile_IV = if IsNaN(IV) then -1 else if IsNaN(HV52WkHigh) then -1 else if IsNaN(HV52WkLow) then -1 else Round((IV - HV52WkLow) / (HV52WkHigh - HV52WkLow) * 100, 0);

AddLabel (show_labels, "Percentile = " + percentile_IV + "%", if percentile_IV > 100 or percentile_IV < 0 then Color.RED else if lightbackground then Color.BLACK else Color.WHITE);
AddLabel (show_labels, if (section == 6) then "Above 5" else if (section == 0) then "Below 1" else if (section == 1.1) then "Lower Section 1" else if (section == 1.2) then "Upper Section 1" else if (section == 2.1) then "Lower Section 2" else if (section == 2.2) then "Upper Section 2" else if (section == 3) then "Section 3" else if (section == 4) then "Section 4" else if (section == 5) then "Section 5" else "N/A", if lightbackground then Color.BLACK else Color.WHITE);

#Highest and Lowest values related to the last 52 weeks are not totally exact since the formula is using a fixed amount of 252 days. Therefore values can slightly differ compared to OptionsEducation.org or TradeStation.

Level30Pct.SetHiding( if show_Section12_breakdown == yes then 0 else 1);
Level10Pct.SetHiding( if show_Section12_breakdown == yes then 0 else 1);

IV.SetDefaultColor(Color.RED);
HV.SetDefaultColor(if lightbackground then Color.BLUE else Color.CYAN);
HV.SetHiding( if hide_HV == yes then 1 else 0);
HV52WkHigh.SetDefaultColor(if lightbackground then Color.DARK_GRAY else Color.WHITE);
Level80Pct.SetDefaultColor(if lightbackground then Color.DARK_GRAY else Color.WHITE);
Level60Pct.SetDefaultColor(if lightbackground then Color.DARK_GRAY else Color.WHITE);
Level40Pct.SetDefaultColor(if lightbackground then Color.DARK_GRAY else Color.WHITE);
Level20Pct.SetDefaultColor(if lightbackground then Color.DARK_GRAY else Color.WHITE);
HV52WkLow.SetDefaultColor(if lightbackground then Color.DARK_GRAY else Color.WHITE);

Level30Pct.SetStyle(Curve.SHORT_DASH);
Level10Pct.SetStyle(Curve.SHORT_DASH);
Level30Pct.SetDefaultColor(if lightbackground then Color.DARK_GRAY else Color.WHITE);
Level10Pct.SetDefaultColor(if lightbackground then Color.DARK_GRAY else Color.WHITE);
HV52WkHigh.SetLineWeight(3);
HV52WkLow.SetLineWeight(3);


AddCloud(HV52WkLow,Level20Pct,Color.WHITE,if show_band_colors then Color.GREEN else Color.White);
AddCloud(Level20Pct,Level40Pct,Color.WHITE,if show_band_colors then Color.LIGHT_GREEN else Color.White);
AddCloud(Level40Pct,Level60Pct,Color.WHITE,if show_band_colors then Color.YELLOW else Color.White);
AddCloud(Level60Pct,Level80Pct,Color.WHITE,if show_band_colors then Color.LIGHT_ORANGE else Color.White);
AddCloud(Level80Pct,HV52WkHigh,Color.WHITE,if show_band_colors then Color.RED else Color.White);

#Copyright (c) 2015 Jose Antonio Blasco Momparler. All rights reserved.
# modifications for light/dark background and 10% and 30% dashedline by Angelo Motta
# modifications for percentile and section labels by Angelo Motta
# modifications for banded color by Frederick Atchley