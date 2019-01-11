import base64
import io
import os
import glob
import os.path
import zipfile
from invoke import task, run
from pprint import pprint


PROJECT_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))


files = [
    # main
    ('run.py', 'run.py'),

    # server
    ('server/serverFlask/__init__.py', 'serverFlask/__init__.py'),
    ('server/serverFlask/server.py', 'serverFlask/server.py')
]

vendors = []

nxos_libs = {
    'greenlet.so': 'nxos_libs/greenlet.so',
    'markupsafe/_speedups.so': 'nxos_libs/_speedups.so'
}


def _path(name='bcm.py'):
    return os.path.join(PROJECT_ROOT, name)


def _template(name="default.py"):
    return os.path.join(PROJECT_ROOT, "tasks", name)


def build_vendor_modules(ctx):
    for entry in os.listdir('vendor'):
        entry = os.path.join('vendor', entry)
        if(os.path.isdir(entry)):
            egg = glob.glob(entry + '/dist/*py2.7*.egg')
            if(len(egg) == 0):
                ctx.run("pushd " + entry + " ; PYTHONPATH=.. python -s setup.py --no-user-cfg bdist_egg ; popd", echo=False)
                egg = glob.glob(entry + '/dist/*py2.7*.egg')
            vendors.extend(egg)


def add_static_files():
    static_folder = os.path.join('static', 'dist')
    for file in os.listdir(static_folder):
        from_file = os.path.join('static', 'dist', file)
        to_file = os.path.join('static', file)
        print from_file, to_file
        files.append((from_file, to_file))


installer_path = _path()
template_path = _template()


@task(default=True)
def generate(ctx):
    print("[generate.installer] Generating installer {} ".format(
        installer_path
    ))

    zfile = io.BytesIO()

    build_vendor_modules(ctx)
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


@task
def clean(ctx):
    for entry in os.listdir('vendor'):
        entry = os.path.join('vendor', entry)
        if(os.path.isdir(entry)):
            egg = glob.glob(entry + '/dist/*py2.7*.egg')
            print egg
            if(len(egg) > 0):
                os.unlink(egg[0])


@task
def deploy(ctx, ip='172.22.40.33', user="admin"):
    run('scp bcm.py {}@{}:/scripts/test.py'.format(user, ip))


@task
def test(ctx, ip='172.22.40.33', user="admin"):
    run('ssh -l {} {} python bootflash:scripts/test.py'.format(user, ip))


# @task(
#     default=True,
#     # pre=[
#     #     call(installer)
#     # ],
# )
# def all(ctx):
#     call(installer)
