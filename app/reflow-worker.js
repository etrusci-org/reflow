"use strict";
let intervalID = null;
const updateInterval = 500;
onmessage = (event) => {
    switch (event.data.action) {
        case 'start':
            if (intervalID)
                return;
            break;
        case 'reset':
        case 'delete':
        case 'stop':
            if (!intervalID)
                return;
            clearInterval(intervalID);
            intervalID = null;
            break;
        default:
            console.error('invalid event action:', event.data.action);
    }
    switch (event.data.action) {
        case 'start':
        case 'reset':
            intervalID = setInterval(() => {
                let now = Date.now();
                let cycleElapsed = now - event.data.cycleStartedOn;
                let totalElapsed = now - event.data.startedOn;
                let averageElapsed = totalElapsed / event.data.cycle;
                let overdueCycle = (event.data.alertAfter > 0 &&
                    cycleElapsed > event.data.alertAfter) ? true : false;
                let overdueAverage = (event.data.alertAfter > 0 &&
                    averageElapsed > event.data.alertAfter) ? true : false;
                postMessage({
                    cycleElapsed: cycleElapsed,
                    totalElapsed: totalElapsed,
                    averageElapsed: averageElapsed,
                    overdueCycle: overdueCycle,
                    overdueAverage: overdueAverage,
                });
            }, updateInterval);
            break;
    }
};
