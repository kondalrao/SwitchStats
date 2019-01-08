from invoke import task, run


@task(
    default=True
)
def all(ctx, ip='172.22.40.33', user="admin", password="Rtp13579"):
    run('ssh -l {} {} "show version"'.format(user, ip))
