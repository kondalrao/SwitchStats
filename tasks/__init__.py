from invoke import Collection

from . import test
from . import generate


ns = Collection()
ns.add_collection(test)
ns.add_collection(generate)