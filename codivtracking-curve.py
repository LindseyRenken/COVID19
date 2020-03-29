# Objective: Determine who is flattening their curve.
# 3-day rolling average of new cases
# extrapolate next point
# plot number of hospital beds per region
# Calculate these curves starting with day 1 as when they hit 100 cases.

# Alert on emerging outbreaks in regions
# Show who's testing the most

import pandas as pd
import io
import os
import requests
import plotly.graph_objects as go
import datetime
import dateutil.parser


url = "http://covidtracking.com/api/states/daily.csv"
s = requests.get(url).content
df = pd.read_csv(io.StringIO(s.decode('utf-8')))
df = df.fillna(0)


def calculatePercentage(p, t):
    return 0 if t == 0 else round((p/t)*100)


df['date'] = list(
    map(lambda s: dateutil.parser.parse(s).date(), df['dateChecked']))
df['percent_positive'] = list(
    map(calculatePercentage, df['positive'], df['totalTestResults']))

df = df.loc[df['date'] > datetime.date(2020, 3, 10)]


groups = list(df.groupby('state'))

if not os.path.exists("images"):
    os.mkdir("images")

# Shows cummulative positive tests per day
fig = go.Figure()
for group in groups:
    fig.add_trace(go.Scatter(
        x=group[1]['date'], y=group[1]['positive'], mode='lines', name=group[0]))

fig.update_layout(
    title="Positive Tests",
    xaxis_title="Date",
    yaxis_title="Number of Tests",
    font=dict(
        family="poppins",
        size=18,
        color="#7f7f7f"
    )
)

fig.show()

# Shows cummulative tests per day
fig = go.Figure()
for group in groups:
    fig.add_trace(go.Scatter(
        x=group[1]['date'], y=group[1]['totalTestResults'], mode='lines', name=group[0]))

fig.update_layout(
    title="Total Tests",
    xaxis_title="Date",
    yaxis_title="Number of Tests",
    font=dict(
        family="poppins",
        size=18,
        color="#7f7f7f"
    )
)

fig.show()

# Shows the percentage of positive tests
fig = go.Figure()
for group in groups:
    fig.add_trace(go.Scatter(
        x=group[1]['date'], y=group[1]['percent_positive'], mode='lines', name=group[0]))

fig.update_layout(
    title="Percentage of Positive Tests",
    xaxis_title="Date",
    yaxis_title="Percent of Tests",
    font=dict(
        family="poppins",
        size=18,
        color="#7f7f7f"
    )
)

fig.show()

# Bar graph of cummulative pos,neg,tested,deaths,pending
last = list(df.groupby('date'))[-1]
last_date = last[0]
last_df = last[1]
last_df = last_df.loc[last_df['positive'] > 200]
last_df = last_df.sort_values(['positive'], ascending=False)
states = list(last_df['state'])

fig = go.Figure(data=[
    go.Bar(name='Deceased', x=states, y=list(last_df['death'])),
    go.Bar(name='Hospitalized', x=states, y=list(last_df['hospitalized'])),
    go.Bar(name='Positive', x=states, y=list(last_df['positive'])),
    go.Bar(name='Negative', x=states, y=list(last_df['negative'])),
    # go.Bar(name='Pending', x=states, y=list(last_df['pending']))
])

fig.update_layout(barmode='stack')
fig.show()


# Create an offseted timeseries for passing 100 cases
groups = list(df.groupby('state'))

x_axis = list(range(0, 50))

fig = go.Figure()
for group in groups:
    state_df = group[1][group[1]['positive'] > 200]
    if len(list(state_df['positive'])) > 1:
        fig.add_trace(go.Scatter(x=x_axis, y=list(state_df['positive'])[
                      ::-1], mode='lines+markers', name=group[0]))
    # state_df['positiveIncrease'] = group[1]['positive'] - group[1]['positive'].shift(1)

fig.update_layout(
    title="Positive Cases Since Reaching 100",
    xaxis_title="Day since reaching 200 cases",
    yaxis_title="Cases",
    font=dict(
        family="poppins",
        size=18,
        color="#7f7f7f"
    )
)

fig.show()

