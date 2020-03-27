# https://datahub.io/core/covid-19
# https://github.com/CSSEGISandData/COVID-19/
# https://www.reddit.com/r/datasets/comments/exnzrd/coronavirus_datasets/
# http://virological.org/t/phylodynamic-analysis-176-genomes-6-mar-2020/356
# https://github.com/nextstrain/ncov
# https://github.com/nytimes/covid-19-data
# https://www.nejm.org/doi/full/10.1056/NEJMoa2001316
# https://coronavirus-resources.esri.com/app/ba772aff9efc4374a3a64457b9240300
# https://nssac.bii.virginia.edu/covid-19/dashboard/
# https://coronavirus-resources.esri.com/
# https://txdshs.maps.arcgis.com/apps/opsdashboard/index.html#/ed483ecd702b4298ab01e8b9cafc8b83
# https://covidtracking.com/
# https://covidtracking.com/api/
# https://ourworldindata.org/covid-testing#covid-19-test-coverage-estimates-as-of-20-march

import pandas as pd
import math
import plotly.graph_objects as go
import os


data = pd.read_csv("~/Downloads/time-series-19-covid-combined_csv.csv")
data['Province/State'] = data['Province/State'].astype(str)
data.loc[data['Province/State'] == 'nan', 'Province/State'] = ''


def combine(c, s):
    return c if s == '' else ', '.join([s, c])


data['Location'] = list(
    map(combine, data['Country/Region'], data['Province/State']))

groups = list(data.groupby('Location'))

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
