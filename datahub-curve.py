# County-level data for the United States
# Number of people tested, number who are negative, number who are positive
# Number of hospitalized patients
# Number of deaths, number of recovered


import pandas as pd
import math
import plotly.graph_objects as go
import os

url = 'https://datahub.io/core/covid-19/r/time-series-19-covid-combined.csv'
s = requests.get(url).content
df = pd.read_csv(io.StringIO(s.decode('utf-8')))
df = df.fillna('')


def combine(c, s):
    return c if s == '' else ', '.join([s, c])


df['Location'] = list(
    map(combine, df['Country/Region'], df['Province/State']))

groups = list(df.groupby('Location'))

if not os.path.exists("images"):
    os.mkdir("images")

for group in groups:
    fig = go.Figure()
    group[1]['NewConfirmed'] = group[1]['Confirmed'] - \
        group[1]['Confirmed'].shift(1)
    fig.add_trace(go.Scatter(x=group[1]['Date'][1:], y=group[1]['NewConfirmed'][1:],
                             mode='lines',
                             name=group[0]))
    fig.write_image("images/{}.png".format(group[0]))
