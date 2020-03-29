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
    map(calculatePercentage, df['positive'], df['tested']))

df = df.loc[df['date'] > datetime.date(2020, 3, 14)]

groups = list(df.groupby('state'))

if not os.path.exists("images"):
    os.mkdir("images")

last = list(df.groupby('date'))[-1]
last_date = last[0]
last_df = last[1]
states = list(last_df['state'])

fig = go.Figure(data=[
    go.Bar(name='Deceased', x=states, y=list(last_df['death'])),
    # go.Bar(name='Hospitalized', x=states, y=list(last_df['hospitalized'])),
    # go.Bar(name='Positive', x=states, y=list(last_df['positive'])),
    # go.Bar(name='Negative', x=states, y=list(last_df['negative'])),
    # go.Bar(name='Pending', x=states, y=list(last_df['pending']))
])

fig.update_layout(barmode='stack')
fig.show()


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
