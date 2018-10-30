# import the Flask class from the flask module
from flask import Flask
from flask_socketio import SocketIO


app = Flask(__name__, static_folder=None)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

from serverFlask import server
