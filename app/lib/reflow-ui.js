export const eHTML = `
    <div class="timer">
        <input class="label" type="text" placeholder="LABEL">

        <div class="ctrl">
            <div>
                <input class="targetTime" type="text" placeholder="Xd Xh Xm Xs">
            </div>
            <div>
                <button class="start">start</button>
                <button class="reset">new cycle</button>
                <button class="stop">stop</button>
                <button class="delete">delete</button>
                <select class="volume">
                    <option disabled>volume</option>
                    <option value="1.0">100%</option>
                    <option value="0.9">90%</option>
                    <option value="0.8">80%</option>
                    <option value="0.7">70%</option>
                    <option value="0.6">60%</option>
                    <option value="0.5" selected>50%</option>
                    <option value="0.4">40%</option>
                    <option value="0.3">30%</option>
                    <option value="0.2">20%</option>
                    <option value="0.1">10%</option>
                    <option value="0.0">0%</option>
                </select>
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
