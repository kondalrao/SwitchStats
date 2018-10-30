from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import datetime, psutil
import threading

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

main_thread = None


def main_thread_worker():
    th = threading.currentThread()
    while getattr(th, "do_run", True):
        socketio.sleep(1)
        # date_time = datetime.datetime.now()
        # print(date_time)
        # socketio.emit('my event',
        #               {'data': date_time.ctime()})
        data = psutil.cpu_times_percent()
        print(data)
        socketio.emit('CPUStats', {'data': list(data)})


@socketio.on('connect')
def test_connect():
    global main_thread

    print('Client connected.')
    # emit('my event', {'data': 'Connected'})

    if(main_thread is None):
        main_thread = socketio.start_background_task(target=main_thread_worker)


@socketio.on('disconnect')
def test_disconnect():
    global main_thread

    print('Client disconnected')
    main_thread.do_run = False
    main_thread.join()
    main_thread = None
    print('Main thread stopped')

@socketio.on('my event')
def test_event():
    print("Welcome, aaa received")
    emit('my event', {'data': 'Server'})

if __name__ == '__main__':
    print("Starting the server...")
    socketio.run(app, port=4000, debug=False)
