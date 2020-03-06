import plotly.graph_objects as go
import pandas as pd
import numpy as np
import plotly.express as px


title = 'Main Source for News'
labels = ['Television', 'Newspaper', 'Internet', 'Radio']
colors = ['rgb(67,67,67)', 'rgb(115,115,115)', 'rgb(49,130,189)', 'rgb(189,189,189)']

mode_size = [8, 8, 12, 8]
line_size = [2, 2, 2, 2]


df = pd.read_csv('graphData/TSd4cammag.csv')


x_data =df.iloc[:,0]

Columns = len(df.columns) - 1

fig = go.FigureWidget()

V = go.Scatter(x=[27.1356792,27.1356792], y=[0,70],mode='lines')

fig.add_trace(V)

for i in range(len(df.columns) - 1):
    fig.add_trace(go.Scatter(x=x_data, y=df.iloc[:,i], mode='lines',
        # name=labels[i],
        line=dict(
            # color=colors[i],
            # width=line_size[i],
            shape='spline'
        ),
        connectgaps=True,
    ))






fig.update_layout(
    xaxis=dict(
        showline=True,
        showgrid=False,
        showticklabels=True,
        linecolor='rgb(204, 204, 204)',
        linewidth=2,
        ticks='outside',
        tickfont=dict(
            family='Arial',
            size=12,
            color='rgb(82, 82, 82)',
        ),

    ),
    yaxis=dict(
        showgrid=False,
        zeroline=False,
        showline=False,
        showticklabels=False,
        range=(0, 70),
        constrain='domain',
    ),

    showlegend=False,
    plot_bgcolor='white'
)

# annotations = []
#
# # Adding labels
# for y_trace, label, color in zip(y_data, labels, colors):
#     # labeling the left_side of the plot
#     annotations.append(dict(xref='paper', x=0.05, y=y_trace[0],
#                                   xanchor='right', yanchor='middle',
#                                   text=label + ' {}%'.format(y_trace[0]),
#                                   font=dict(family='Arial',
#                                             size=16),
#                                   showarrow=False))
#     # labeling the right_side of the plot
#     annotations.append(dict(xref='paper', x=0.95, y=y_trace[11],
#                                   xanchor='left', yanchor='middle',
#                                   text='{}%'.format(y_trace[11]),
#                                   font=dict(family='Arial',
#                                             size=16),
#                                   showarrow=False))
# # Title
# annotations.append(dict(xref='paper', yref='paper', x=0.0, y=1.05,
#                               xanchor='left', yanchor='bottom',
#                               text='Main Source for News',
#                               font=dict(family='Arial',
#                                         size=30,
#                                         color='rgb(37,37,37)'),
#                               showarrow=False))
# # Source
# annotations.append(dict(xref='paper', yref='paper', x=0.5, y=-0.1,
#                               xanchor='center', yanchor='top',
#                               text='Source: PewResearch Center & ' +
#                                    'Storytelling with data',
#                               font=dict(family='Arial',
#                                         size=12,
#                                         color='rgb(150,150,150)'),
#                               showarrow=False))
#
# fig.update_layout(annotations=annotations)

fig.show()

fig.data=[]

fig.layout = {}



