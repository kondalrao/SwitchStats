import sys

def main(filename=None):
    from serverFlask import app
    app.debug = True
    app.config['zfile'] = filename
    app.run(host='0.0.0.0', port=5000)


# start the server with the 'run()' method
if __name__ == '__main__':
    sys.path.insert(0, './vendor')
    from server.serverFlask import app
