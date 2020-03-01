import numpy as np
import socket
import click
import pymongo
import subprocess
import pickle
import pandas as pd
import sys


weights = np.load('weights.npy')
poly = pickle.load(open('tempoly.pickle','rb'))


def predict_matrix(x):
    return np.matmul(poly.transform(x),weights) + 13.698074248500697
def predict(time, intensity):
    return ((np.matmul(poly.transform(np.array([float(time), float(intensity)]).reshape(1,-1)), weights) + 13.698074248500697)[0])

def whole_day(x):
    day = []
    for i in range(0,1440):
        day.append(i*60)
    z = []
    for i in range(0, 1440):
        z.append(x)
    x = pd.DataFrame({'Time':day,"Intensity":z})
    return list(predict_matrix(x.to_numpy()))
def predict(time, intensity):
    return (np.matmul(poly.transform(np.array([float(time), float(intensity)]).reshape(1,-1)), weights) + 13.698074248500697)[0]

if __name__ == "__main__":
    if int(sys.argv[1])  == 1:
        print(whole_day(float(sys.argv[2])))
    else:
        print(predict(float(sys.argv[2]),float(sys.argv[3])))