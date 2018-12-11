const debug = require('debug')('@switch-stats/feathers:switch-details');

const version = {
  "header_str": "Cisco Nexus Operating System (NX-OS) Software\nTAC support: http://www.cisco.com/tac\nCopyright (C) 2002-2018, Cisco and/or its affiliates.\nAll rights reserved.\nThe copyrights \
to certain works contained in this software are\nowned by other third parties and used and distributed under their own\nlicenses, such as open source.  This software is provided \"as is,\" and un \
less\notherwise stated, there is no warranty, express or implied, including but not\nlimited to warranties of merchantability and fitness for a particular purpose.\nCertain components of this soft \
ware are licensed under\nthe GNU General Public License (GPL) version 2.0 or \nGNU General Public License (GPL) version 3.0  or the GNU\nLesser General Public License (LGPL) Version 2.1 or \nLesse \
r General Public License (LGPL) Version 2.0. \nA copy of each such license is available at\nhttp://www.opensource.org/licenses/gpl-2.0.php and\nhttp://opensource.org/licenses/gpl-3.0.html and\nhtt \
p://www.opensource.org/licenses/lgpl-2.1.php and\nhttp://www.gnu.org/licenses/old-licenses/library.txt.",
  "bios_ver_str": "01.10 [last: 00.09]",
  "kickstart_ver_str": "9.2(3) [build 9.2(1)IHV(0.77)]",
  "bios_cmpl_time": "12/15/2017 [last: 05/15/2017]",
  "kick_file_name": "bootflash:///nxos.9.2.1-celau.bin",
  "kick_cmpl_time": "10/26/2018 2:00:00",
  "kick_tmstmp": "11/01/2018 00:29:30",
  "chassis_id": "Nexus3000 N3K-C36180YC-R Chassis",
  "cpu_name": "Intel(R) Xeon(R) CPU D-1528 @ 1.90GHz",
  "memory": "32792004",
  "mem_type": "kB",
  "proc_board_id": "FOC211816M2",
  "host_name": "bifrost_sw12",
  "bootflash_size": "105614508",
  "kern_uptm_days": "0",
  "kern_uptm_hrs": "8",
  "kern_uptm_mins": "43",
  "kern_uptm_secs": "45",
  "rr_usecs": "268490",
  "rr_ctime": "Tue Nov  6 18:04:24 2018",
  "rr_reason": "Reset Requested by CLI command reload",
  "rr_sys_ver": "9.2(3)",
  "rr_service": null,
  "manufacturer": "Cisco Systems, Inc.",
  "TABLE_package_list": {
      "ROW_package_list": {
          "package_id": null
      }
  }
}

const moduleInfo = {
  "TABLE_modinfo": {
      "ROW_modinfo": {
          "modinf": "1",
          "ports": "54",
          "modtype": "48x25G + 6x100G Ethernet Module",
          "model": "N3K-C36180YC-R",
          "status": "active *"
      }
  },
  "TABLE_modwwninfo": {
      "ROW_modwwninfo": {
          "modwwn": "1",
          "sw": "9.2(1)IHV(0.77)",
          "hw": "0.0",
          "slottype": "NA"
      }
  },
  "TABLE_modmacinfo": {
      "ROW_modmacinfo": {
          "modmac": "1",
          "mac": "0c-75-bd-07-e3-f2 to 0c-75-bd-07-e4-45",
          "serialnum": "FOC211816M2"
      }
  },
  "TABLE_moddiaginfo": {
      "ROW_moddiaginfo": {
          "mod": "1",
          "diagstatus": "Pass"
      }
  }
}

// const version = JSON.stringify(versionOBJ)
// const moduleInfo = JSON.stringify(moduleInfoOBJ)

class SwitchDetailsService {
  setup(app) {
    this.app = app;
  }
  async find(params) {
    debug('find');
    return {version, moduleInfo};
  }
  async get(id, params) {}
  async create(data, params) {}
  async update(id, data, params) {}
  async patch(id, data, params) {}
  async remove(id, params) {}
  setup(app, path) {}
}
  
module.exports = function (options) {
  return new SwitchDetailsService(options);
};