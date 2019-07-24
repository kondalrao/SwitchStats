# SwitchStats
NXOS Switch Statistics

ip netns exec management rsync -avzhe ssh --progress --exclude 'node_modules' --exclude '.cache' user@10.157.200.98:~/Workspace/Python/SwitchStats /tmp

ip netns exec management rsync -avzhe ssh --progress --exclude 'node_modules' --exclude '.cache' user@10.157.200.98:~/Workspace/Python/SwitchStats/bcm.py /bootflash/scripts/bcm.py.new
