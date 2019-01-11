
import eventlet

eventlet.monkey_patch()


def main(filename=None):
    from serverFlask import app, socketio

    app.debug = False
    app.config['zfile'] = filename
    socketio.run(app, host='0.0.0.0', port=5000, log_output=True)


# start the server with the 'run()' method
# if __name__ == '__main__':
#     import sys
#     sys.path.insert(0, './vendor')
#     from server.serverFlask import app
