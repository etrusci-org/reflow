let intervalID: null | number = null
const updateInterval: number = 177




onmessage = (event): void => {
    switch (event.data.action) {
        case 'start':
            if (intervalID) return
            break

        case 'reset':
        case 'delete':
        case 'stop':
            if (!intervalID) return
            clearInterval(intervalID)
            intervalID = null
            break

        default:
            console.error('invalid event action:', event.data.action)
    }

    switch (event.data.action) {
        case 'start':
        case 'reset':
            intervalID = setInterval(() => {
                let now = Date.now()
                let cycleElapsed = now - event.data.cycleStartedOn
                let totalElapsed = now - event.data.startedOn
                let averageElapsed = totalElapsed / event.data.cycle

                postMessage({
                    cycleElapsed: cycleElapsed,
                    totalElapsed: totalElapsed,
                    averageElapsed: averageElapsed,
                    overdueCycle: (
                        event.data.alertAfter > 0 &&
                        cycleElapsed > event.data.alertAfter
                    ) ? true : false,
                    overdueAverage: (
                        event.data.alertAfter > 0 &&
                        averageElapsed > event.data.alertAfter
                    ) ? true : false,
                })
            }, updateInterval)
            break;
    }
}

























// onmessage = (event) => {

//     if (event.data.action == 'start') {
//         if (intervalID) return

//         intervalID = setInterval(() => {
//             let now = Date.now()
//             postMessage({
//                 cycleElapsed: now - event.data.cycleStartedOn,
//                 totalElapsed: now - event.data.startedOn,
//                 averageElapsed: (now - event.data.startedOn) / event.data.cycle,
//             })
//         }, updateInterval)
//     }


//     if (event.data.action == 'reset') {
//         if (!intervalID) return

//         clearInterval(intervalID)
//         intervalID = null

//         intervalID = setInterval(() => {
//             let now = Date.now()
//             postMessage({
//                 cycleElapsed: now - event.data.cycleStartedOn,
//                 totalElapsed: now - event.data.startedOn,
//                 averageElapsed: (now - event.data.startedOn) / event.data.cycle,
//             })
//         }, updateInterval)
//     }


//     if (event.data.action == 'delete') {
//         if (!intervalID) return

//         clearInterval(intervalID)
//         intervalID = null
//     }


//     if (event.data.action == 'stop') {
//         if (!intervalID) return

//         clearInterval(intervalID)
//         intervalID = null
//     }
// }
