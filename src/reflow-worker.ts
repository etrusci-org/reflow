let intervalID: null | number = null
const updateInterval: number = 77




onmessage = (event) => {

    if (event.data.action == 'start') {
        if (intervalID) return

        intervalID = setInterval(() => {
            postMessage({
                // id: event.data.id,
                roundElapsed: Date.now() - event.data.roundStartedOn,
                totalElapsed: Date.now() - event.data.startedOn,
                averageElapsed: (Date.now() - event.data.startedOn) / event.data.round,
            })
        }, updateInterval)
    }


    if (event.data.action == 'reset') {
        if (!intervalID) return

        clearInterval(intervalID)
        intervalID = null

        intervalID = setInterval(() => {
            postMessage({
                // id: event.data.id,
                roundElapsed: Date.now() - event.data.roundStartedOn,
                totalElapsed: Date.now() - event.data.startedOn,
                averageElapsed: (Date.now() - event.data.startedOn) / event.data.round,
            })
        }, updateInterval)
    }


    if (event.data.action == 'delete') {
        if (!intervalID) return

        clearInterval(intervalID)
        intervalID = null
    }


    if (event.data.action == 'stop') {
        if (!intervalID) return

        clearInterval(intervalID)
        intervalID = null
    }
}