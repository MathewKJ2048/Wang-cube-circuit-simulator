export function listTiles(wf) {
    const ttp_panel = document.getElementById("tile-picker-dynamic");
    ttp_panel.innerHTML = '';
    for (let t of wf.tileTypes) {
        console.log(t);
        const button = document.createElement('button');
        button.textContent = t.name;
        ttp_panel.appendChild(button);
    }
}
