from flask import Flask,render_template,request
from predict import predict

app = Flask(__name__)


@app.route('/form',methods=['POST',"GET"])
def form():
    if request.method == "POST":
        return str(predict(float(request.form['Text']),float(request.form['Time'])))
    return render_template('index.html')
if __name__ == "__main__":
    app.run(debug=True)
