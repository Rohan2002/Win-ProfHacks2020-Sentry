import numpy as np
import pandas as pd
from predict import predict_matrix
import matplotlib.pyplot as plt
import click

@click.group()
def home():
    pass


@home.command()
@click.option('--x')
def whole_day(x):
    day = []
    for i in range(0,1440):
        day.append(i*60)
    z = []
    for i in range(0, 1440):
        z.append(x)
    x = pd.DataFrame({'Time':day,"Intensity":z})
    click.echo(list(predict_matrix(x.to_numpy())))
    plt.plot(x['Time'],predict_matrix(x.to_numpy()))
    plt.show()

if __name__ == "__main__":
    home()



