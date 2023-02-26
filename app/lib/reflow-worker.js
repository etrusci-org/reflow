"use strict";
let intervalID = 0;
const updateInterval = 1000;
function pm(d) {
    const tnow = Date.now();
    postMessage({
        cycle: d.cycle,
        elapsedCycle: tnow - d.cycleStartedOn,
        elapsedTotal: tnow - d.firstStartedOn,
        elapsedAverage: (tnow - d.firstStartedOn) / d.cycle,
        targetTime: d.targetTime,
        isOverdueCycle: (d.targetTime > 0 && (tnow - d.cycleStartedOn) > d.targetTime) ? true : false,
        isOverdueAverage: (d.targetTime > 0 && (tnow - d.firstStartedOn) / d.cycle > d.targetTime) ? true : false,
    });
}
onmessage = (event) => {
    const d = event.data;
    switch (d.action) {
        case 'start':
            if (intervalID) {
                console.error('worker already running');
                return;
            }
            break;
        case 'reset':
        case 'stop':
        case 'delete':
            if (!intervalID) {
                console.error('there is running worker');
                return;
            }
            clearInterval(intervalID);
            intervalID = 0;
            break;
    }
    switch (d.action) {
        case 'start':
        case 'reset':
            pm(d);
            intervalID = setInterval(pm, updateInterval, d);
            break;
    }
};
