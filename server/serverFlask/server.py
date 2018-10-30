import os
import zipfile
from flask import Response
from serverFlask import app, socketio
from flask_socketio import emit


def get_file(zfile, filename):  # pragma: no cover
    mimetypes = {
        ".css": "text/css",
        ".html": "text/html",
        ".js": "application/javascript",
        ".png": "image/png",
        ".gif": "image/gif",
        ".jpeg": "image/jpeg",
        ".jpg": "image/jpeg",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon"
    }

    filename = os.path.join('static', filename)
    ext = os.path.splitext(filename)[1]
    mimetype = mimetypes.get(ext, "text/html")

    print zfile, filename, ext, mimetype

    try:
        tzf = zipfile.ZipFile(zfile, 'r')
        content = tzf.open(filename).read()
        return mimetype, content
    except IOError as exc:
        print str(exc)
        return None, None


@socketio.on_error_default
def handle_error(e):
    print "Error: ", e


@socketio.on('my_event')
def test_message(message):
    emit('my response', {'data': 'got it!'})


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def static_file(path):
    print "static_file: ", path
    mimetype, content = get_file(app.config['zfile'], path)
    return Response(content, mimetype=mimetype)


@app.route('/')
def home():
    print "home"
    mimetype, content = get_file(app.config['zfile'], 'index.html')
    return Response(content, mimetype=mimetype)
