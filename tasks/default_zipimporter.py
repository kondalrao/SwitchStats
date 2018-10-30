
import io
import os
import sys
import imp
import zipfile
from base64 import b64decode


class ZipImporter(object):
    # Taken from https://stackoverflow.com/a/39136473

    def __init__(self, zip_file):
        self.z = zip_file
        self.zfile = zipfile.ZipFile(self.z)
        self._paths = [x.filename for x in self.zfile.filelist]

    def _mod_to_paths(self, fullname):
        # print "_mod_to_paths: ", fullname

        # get the python module name
        py_filename = fullname.replace(".", os.sep) + ".py"
        py_filename = py_filename.lower()

        # get the filename if it is a package/subpackage
        count = fullname.count(".") - 1 if fullname.count(".") - 1 else 1
        py_package = fullname.replace(".", os.sep, fullname.count(".")) + "/__init__.py"
        py_package = py_package.lower()

        if py_filename in self._paths:
            # print "returning filename: ", py_filename
            return py_filename
        elif py_package in self._paths:
            # print "returning package: ", py_package
            return py_package
        else:
            print "returning NONE: ", py_filename, " ", py_package, " for fullname: ", fullname
            return None

    def find_module(self, fullname, path=None):
        if self._mod_to_paths(fullname) is not None:
            return self
        print "Couldn't find module: ", path, " ", fullname
        return None

    def is_package(self, fullname):
        print "is_package: ", fullname
        filename = self._mod_to_paths(fullname)
        return True if filename.endswith("__init__.py") else False

    def load_module(self, fullname):
        print "Loading module: ", fullname
        if fullname in sys.modules:
            return sys.modules[fullname]

        filename = self._mod_to_paths(fullname)
        if filename not in self._paths:
            print filename, "not in self._paths"
            raise ImportError(fullname)

        print "Creating new module: ", filename
        if filename.endswith("__init__.py"):
            # print "Module package: ", filename
            new_module = imp.new_module(fullname)
            new_module.__file__ = filename
            new_module.__loader__ = self
            new_module.__path__ = [filename]
            new_module.__package__ = fullname
            sys.modules[fullname] = new_module
            # print "** Compiling ", filename
            exec compile(self.zfile.open(filename, 'r').read(), filename, 'exec') in new_module.__dict__
            # print "** Done compilation ", filename
        else:
            # print "module not package: ", filename
            new_module = imp.new_module(fullname)
            new_module.__file__ = filename
            new_module.__package__ = fullname.rpartition('.')[0]
            sys.modules[fullname] = new_module
            sys.modules[fullname.lower()] = new_module

            # print "** Executing ", filename
            exec self.zfile.open(filename, 'r').read() in new_module.__dict__
            # print "** Done execution ", filename

        print "Adding new module: ", filename
        return new_module


def main():
    try:
        zfile = io.BytesIO(b64decode(DATA.replace(b"\n", b"")))
        sys.meta_path.append(ZipImporter(zfile))

        from run import main
        main()

    finally:
        pass


DATA = b"""
{zipfile}
"""


if __name__ == "__main__":
    main()
