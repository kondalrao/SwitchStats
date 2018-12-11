const debug = require('debug')('@switch-stats/feathers:cpu-info');
const os = require('os');
var cpuStat = require('cpu-stat');
var usage = require('cpu-percentage');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cpuUsage() {
  return new Promise(resolve => {
    cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
        console.log(err);
        return 0;
      }
  
      //the percentage cpu usage over all cores
      console.log(percent);
  
      //the approximate number of seconds the sample was taken over
      // console.log(seconds);

      resolve(percent);
    });
  })
}

class CpuInfo {
  setup(app) {
    this.app = app;
  }
  async find(params) {
    debug('find');

    // const start = usage();
    // await sleep(1);
    // const usageData = usage(start)

    // console.log(usageData.percent);
    // return {loadavg: usageData.percent};

    const usageData = await cpuUsage()
    return {loadavg: usageData};

    // return {loadavg: os.loadavg()[0]};
  }
  async get(id, params) {}
  async create(data, params) {}
  async update(id, data, params) {}
  async patch(id, data, params) {}
  async remove(id, params) {}
  setup(app, path) {}

  cpuData () {
    var cpus = os.cpus();
    console.log(os.loadavg());
    
    for(var i = 0, len = cpus.length; i < len; i++) {
      console.log("CPU %s:", i);
      var cpu = cpus[i], total = 0;

      for(var type in cpu.times) {
        total += cpu.times[type];
      }

      for(type in cpu.times) {
        console.log("\t", type, Math.round(100 * cpu.times[type] / total));
      }
    }
  }
}
  
module.exports = function (options) {
  return new CpuInfo(options);
};