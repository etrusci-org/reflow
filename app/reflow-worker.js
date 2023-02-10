"use strict";
let intervalID = null;
const updateInterval = 250;
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
                postMessage({
                    cycleElapsed: now - event.data.cycleStartedOn,
                    totalElapsed: now - event.data.startedOn,
                    averageElapsed: (now - event.data.startedOn) / event.data.cycle,
                    overdueCycle: (event.data.alertAfter > 0 &&
                        now - event.data.cycleStartedOn > event.data.alertAfter) ? true : false,
                    overdueAverage: (event.data.alertAfter > 0 &&
                        (now - event.data.startedOn) / event.data.cycle > event.data.alertAfter) ? true : false,
                });
            }, updateInterval);
            break;
    }
};
