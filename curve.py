import pandas as pd
import math

data = pd.read_csv("~/Downloads/time-series-19-covid-combined_csv.csv")
data['Province/State'] = data['Province/State'].astype(str)
data.loc[data['Province/State'] == 'nan', 'Province/State'] = ''


def combine(c, s):
    return c if s == '' else ', '.join([s, c])


data['location'] = list(
    map(combine, data['Country/Region'], data['Province/State']))

groups = list(data.groupby('location'))

for group in groups:
    location = group[0]
    df = group[1]
    df['new_confirmed'] = df['Confirmed'] - df['Confirmed'].shift(1)
