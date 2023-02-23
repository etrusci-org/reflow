export const eHTML = `
    <div class="timer">
        <input class="label">

        <div class="ctrl">
            <div>
                <button class="start">start</button>
                <button class="reset">reset</button>
                <button class="stop">stop</button>
                <button class="delete">delete</button>
            </div>
            <div>
                <input class="targetTime" type="text">
                <input class="volume" type="range" min="0.0" max="1.0" step="0.05" value="0.5">
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th colspan="2">Cycle</th>
                    <th>Total</th>
                    <th>Average</th>
                    <th>Target</th>
                </tr>
            </thead>
            <tbody>
                <tr class="now">
                    <td class="cycle">-</td>
                    <td class="elapsedCycle">-</td>
                    <td class="elapsedTotal">-</td>
                    <td class="elapsedAverage">-</td>
                    <td class="targetTime">-</td>
                </tr>
            </tbody>
        </table>
    </div>
`;
export const ePastHTML = `
    <tr class="past">
        <td class="cycle">-</td>
        <td class="elapsedCycle">-</td>
        <td class="elapsedTotal">-</td>
        <td class="elapsedAverage" colspan="2">-</td>
    </tr>
`;
