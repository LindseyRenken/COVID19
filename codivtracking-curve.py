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
import statistics


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


# Create an offseted timeseries for passing 200 cases
groups = list(df.groupby('state'))

x_axis = list(range(0, 30))

y_25 = [200]
y_50 = [200]
for i in x_axis:
    y_25.append(y_25[i]*1.25)
    y_50.append(y_50[i]*1.50)


fig = go.Figure()
for group in groups:
    state_df = group[1][group[1]['positive'] > 200]
    if len(list(state_df['positive'])) > 1:
        fig.add_trace(go.Scatter(x=x_axis, y=list(state_df['positive'])[
                      ::-1], mode='lines+markers', name=group[0]))

fig.add_trace(go.Scatter(x=x, y=y_25, mode='lines+markers', name='25 percent'))
fig.add_trace(go.Scatter(x=x, y=y_50, mode='lines+markers', name='50 percent'))

fig.update_layout(
    title="Positive Cases Since Reaching 100",
    xaxis_title="Days since reaching 200 cases",
    yaxis_title="Cases",
    font=dict(
        family="poppins",
        size=18,
        color="#7f7f7f"
    )
)

fig.show()


# emerging, expanding, contracting, steady?

# emerging: between 1 and 200 active cases
# expanding: over 200 cases and 7day average is positive growth day-on-day
# contracting: over 200 cases and 7day average is negative growth day-on-day
# steady?: over 200 cases and 7day average is +/- 10% day-on-day growth


# Show percent increase in the last week
groups = list(df.groupby('state'))

today = datetime.datetime.now()
delta = datetime.timedelta(days=7)
cutoff = today - delta

res = []

for group in groups:
    state_df = group[1][group[1]['date'] >= cutoff.date()]
    positives = state_df['positive']
    rates = list(map(lambda inc, tot: 100*(inc / (tot+0.001)),
                     state_df['positiveIncrease'], state_df['positive']))
    accelerations = [x-y for x, y in zip(rates, rates[1:])]
    acc_avg = round(statistics.mean(accelerations), 2)
    rate_avg = round(statistics.mean(rates), 2)
    emerging = False
    if list(positives)[0] <= 200:
        emerging = True
    res.append({'state': group[0], 'positive': list(positives)[
               0], 'growth': rate_avg, 'acceleration': acc_avg, 'emerging': emerging})

res_df = pd.DataFrame(res)
sorted_df = res_df[res_df['emerging'] == False].sort_values(
    ['growth'], ascending=False)

