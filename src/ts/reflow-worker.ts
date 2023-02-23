let intervalID: number = 0
const updateInterval: number = 1000



onmessage = (event): void => {
    // interval prep
    const d = event.data

    switch (d.action) {
        case 'start':
            if (intervalID) {
                console.error('worker already running')
                return
            }
            break

        case 'reset':
        case 'stop':
        case 'delete':
            if (!intervalID) {
                console.error('there is running worker')
                return
            }

            clearInterval(intervalID)
            intervalID = 0
            break
    }

    // exec interval
    switch (d.action) {
        case 'start':
        case 'reset':
            intervalID = setInterval(() => {
                const tnow = Date.now()
                postMessage({
                    cycle: d.cycle,
                    elapsedCycle: tnow - d.cycleStartedOn,
                    elapsedTotal: tnow - d.firstStartedOn,
                    elapsedAverage: (tnow - d.firstStartedOn) / d.cycle,
                    targetTime: d.targetTime,
                    isOverdueCycle: (d.targetTime > 0 && (tnow - d.cycleStartedOn) > d.targetTime) ? true : false,
                    isOverdueAverage: (d.targetTime > 0 && (tnow - d.firstStartedOn) / d.cycle > d.targetTime) ? true : false,
                })
            }, updateInterval)
            break;
    }
}
