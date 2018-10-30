
import io
import os
import sys
from base64 import b64decode


def main():
    try:
        file_path = '/tmp/bcm.egg'

        zfile = io.BytesIO(b64decode(DATA.replace(b"\n", b"")))

        os.unlink(file_path) if os.path.exists(file_path) else None

        with io.open(file_path, "wb") as diskfile:
            diskfile.write(zfile.getvalue())

        sys.path.insert(0, file_path)

        from run import main
        main(file_path)

    finally:
        os.unlink(file_path) if os.path.exists(file_path) else None


DATA = b"""
{zipfile}
"""


if __name__ == "__main__":
    main()
