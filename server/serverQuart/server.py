from quart import Quart, send_from_directory
from App01.server import blueprint

app = Quart(__name__)
app.add_url_rule('/static/<filename', send_from_directory('static/dist'))
app.register_blueprint(blueprint)

@app.route('/')
# @app.route('/static/<filename>')
async def index(filename='index.html'):
    # return 'Hello World'
    return await send_from_directory('static/dist', filename)

# @app.route('/test')
# async def index():
#     return 'Hello World'

def start(host='localhost', port=9090, debug=True):
    app.run(host=host, port=port, debug=debug, use_reloader=True)
