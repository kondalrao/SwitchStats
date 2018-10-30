import base64
import io
import os
import os.path
import zipfile
import invoke
from pprint import pprint


PROJECT_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))


files = [
    # main
    ('run.py', 'run.py'),

    # server
    ('server/serverFlask/__init__.py', 'serverFlask/__init__.py'),
    ('server/serverFlask/server.py', 'serverFlask/server.py'),

    # static files
    # ('static/dist/index.html', 'static/index.html'),
    # ('static/dist/favicon.7a689672.ico', 'static/favicon.7a689672.ico'),
    # ('static/dist/src.cb691fa8.js', 'static/src.cb691fa8.js'),
    # ('static/dist/reactjs.72ef012e.png', 'static/reactjs.72ef012e.png'),
    # ('static/dist/parceljs.86e40d7c.png', 'static/parceljs.86e40d7c.png'),
]

vendors = [
    'vendor/eventlet/dist/eventlet-0.24.1-py2.7.egg',
    'vendor/greenlet/dist/greenlet-0.4.15-py2.7-macosx-10.13-x86_64.egg',
    'vendor/python-fire/dist/fire-0.1.3-py2.7.egg',
    'vendor/flask/dist/Flask-1.1.dev0-py2.7.egg',
    'vendor/Flask-SocketIO/dist/Flask_SocketIO-3.0.2-py2.7.egg',
    'vendor/python-socketio/dist/python_socketio-2.0.0-py2.7.egg',
    'vendor/itsdangerous/dist/itsdangerous-1.0.dev20180927-py2.7.egg',
    'vendor/jinja/dist/Jinja2-2.11.dev0-py2.7.egg',
    'vendor/werkzeug/dist/Werkzeug-0.15.dev0-py2.7.egg',
    'vendor/markupsafe/dist/MarkupSafe-1.1.dev0-py2.7-macosx-10.13-x86_64.egg',
    'vendor/click/dist/Click-8.0.dev0-py2.7.egg',
    'vendor/python-engineio/dist/python_engineio-2.3.0-py2.7.egg',
]

nxos_libs = {
    # 'greenlet.so': 'nxos_libs/greenlet.so',
    # 'markupsafe/_speedups.so': 'nxos_libs/_speedups.so'
}

def _path(name='bcm.py'):
    return os.path.join(PROJECT_ROOT, name)


def _template(name="default.py"):
    return os.path.join(PROJECT_ROOT, "tasks", name)


def build_vendor_modules(ctx):
    # Start building the vendor modules
    ctx.run('pushd vendor/eventlet ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)
    ctx.run('pushd vendor/python-fire ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)
    ctx.run('pushd vendor/python-socketio ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)
    ctx.run('pushd vendor/flask ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)
    ctx.run('pushd vendor/Flask-SocketIO ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)
    ctx.run('pushd vendor/itsdangerous ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)
    ctx.run('pushd vendor/jinja ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)
    ctx.run('pushd vendor/werkzeug ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)
    ctx.run('pushd vendor/greenlet ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)    # HAS GCC #
    ctx.run('pushd vendor/markupsafe ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)  # HAS GCC #
    ctx.run('pushd vendor/click ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)
    ctx.run('pushd vendor/python-engineio ; python setup.py --no-user-cfg bdist_egg ; popd', echo=False)


def add_static_files():
    static_folder = os.path.join('static', 'build')
    for file in os.listdir(static_folder):
        from_file = os.path.join('static', 'build', file)
        to_file = os.path.join('static', file)
        print from_file, to_file
        files.append((from_file, to_file))


installer_path = _path()
template_path = _template()

print("[generate.installer] Generating installer {} ".format(
    installer_path
))


@invoke.task
def installer(ctx):
    zfile = io.BytesIO()

    # build_vendor_modules(ctx)
    add_static_files()

    with io.open(template_path, "r", encoding="utf8") as fp:
        WRAPPER_TEMPLATE = fp.read()

    with zipfile.ZipFile(zfile, "w", zipfile.ZIP_DEFLATED) as zf:
        for file, arcfile in files:
            # print('adding file: ' + file)
            zf.write(file, arcfile)

    with zipfile.ZipFile(zfile, 'a', zipfile.ZIP_DEFLATED) as zf:
        for zname in vendors:
            tzf = zipfile.ZipFile(zname, 'r')
            for fname in tzf.namelist():
                if "EGG" in fname:
                    continue
                elif fname in nxos_libs:
                    # print "**", fname, " -> ", nxos_libs[fname], "**"
                    with io.open(nxos_libs[fname], "rb") as fp:
                        zf.writestr(fname, fp.read())
                else:
                    zf.writestr(fname, tzf.open(fname).read())

    pprint(zipfile.ZipFile(zfile).namelist())
    # with io.open('/tmp/bcm/bcm.egg', "wb") as diskfile:
    #     diskfile.write(zfile.getvalue())

    zipdata = base64.b64encode(zfile.getvalue()).decode("utf8")
    chunked = []

    for i in range(0, len(zipdata), 79):
        chunked.append(zipdata[i:i + 79])

    with open(installer_path, "w") as fp:
        fp.write(
            WRAPPER_TEMPLATE.format(
                zipfile="\n".join(chunked)
            ),
        )

    # Ensure the permissions on the newly created file
    oldmode = os.stat(installer_path).st_mode & 0o7777
    newmode = (oldmode | 0o555) & 0o7777
    os.chmod(installer_path, newmode)

    print("[generate.installer] Generated installer.")


@invoke.task(
    default=True,
    pre=[
        invoke.call(installer)
    ],
)
def all(ctx):
    pass
