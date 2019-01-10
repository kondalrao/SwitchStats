
import io
import os
import sys
import shutil
import zipfile
from base64 import b64decode


def remove(path):
    if not os.path.exists(path): return

    if os.path.isfile(path):
        os.remove(path)  # remove the file
    elif os.path.isdir(path):
        shutil.rmtree(path)  # remove dir and all contains
    else:
        raise ValueError("file %s is not a file or dir." % (path))


def main():
    try:
        file_path = '/tmp/bcm.egg'
        module_path = '/tmp/bcm'

        zfile = io.BytesIO(b64decode(DATA.replace(b"\n", b"")))

        remove(file_path) # if os.path.exists(file_path) else None
        remove(module_path) # if os.path.exists(module_path) else None

        with io.open(file_path, "wb") as diskfile:
            diskfile.write(zfile.getvalue())

        with zipfile.ZipFile(file_path,"r") as zip_ref:
            zip_ref.extractall(module_path)

        # sys.path.insert(0, file_path)
        sys.path.insert(0, module_path)

        from run import main
        main(file_path)

    finally:
        # os.unlink(file_path) if os.path.exists(file_path) else None
        pass


DATA = b"""
{zipfile}
"""


if __name__ == "__main__":
    main()
