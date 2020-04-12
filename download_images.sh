states=(AL
AK
AZ
AR
CA
CO
CT
DE
FL
GA
HI
ID
IL
IN
IA
KS
KY
LA
ME
MD
MA
MI
MN
MS
MO
MT
NE
NV
NH
NJ
NM
NY
NC
ND
OH
OK
OR
PA
RI
SC
SD
TN
TX
UT
VT
VA
WA
WV
WI
WY
DC
AS
GU
MP
PR
UM
VI)

for var in ${states[@]}
do
    lower=$( tr '[A-Z]' '[a-z]' <<< $var) 
    curl http://flags.ox3.in/svg/us/$lower.svg --output ./public/$var.svg
done


