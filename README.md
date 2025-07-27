# Wang-cube-circuit-simulator


A tool to simulate digital circuits using Wang cubes

## Install instructions:

```
git clone https://github.com/MathewKJ2048/Wang-cube-circuit-simulator
npm install
npm run build
npm run preview
```
The web-app is launched by opening the link provided (usually `localhost:4173` for vite). For development with a vite server, run `npm run dev` and follow the link provided (usually `localhost:5137` for vite).

## Design decisions:

camera - an object with a zoom level, x and y
tiles are present in integer coordinates

tile-type:
name
color
up, down, left, right, front, back - strings

tile:
type = tile-type object
location = integer coordinates
left_neighbor, ... references to other tiles

circuit:
name
a collection of tiles

context:
collection of circuits, tile-types and saved circuits

UI elements:

zoom in
zoom out


## User stories:

- enter with a sample tiling, sample tile-type etc
- save and load files with config
- zoom in and out
- search for a tile-type and see it displayed
- add a new tile-type and see errors instantly show up
- delete a tile-type and see it instantly updated in the screen

## UI elements:

- mode-based editor
- default mode - used to drag, and clicking a tile selects the tiletype in the sidebar and brings it up in the editor
- select mode - one click sets the top corner, with the selection following one around. Second click sets the bottom corner. third click cancels selection and goes back to default
- erase mode - anything it touches while dragging is eliminated
- place down mode: activated by clicking a tile in the tile search - same as erase but it places down the tile
- circuit-place-down mode: same as place-down-mode, but now it's a whole circuit

## run features:

- step forward
- step back
- play/pause
- speed controls (speed up, speed down, speed bar)


## UI nomenclature:

- screen divided into three sections with fixed ratios
- each section contains multiple panes
- top and pane in the middle contains two control-panes (one left and one right)
- each control pane holds multiple control groups
- each control group holds elements like buttons and other stuff
- right control pane shrinks, left control pane 

## Tile plane system:

- text field with text input, every time text is entered, it does a search for matches
- if the text field is empty, default text is the search emoji, and all match empty
- text field has a add button and a regex toggle button, is it's own control group
- the results show up in a results sub-pane, which is generated entirely
- each entry has the tile name, a button with "add" and a button with "edit" and one with "delete". The add button is square, with the tile's color. The edit button loads the tile into the tile editor
- the tile editor has the following button: save changes


## UI system:

- each UI component has a setUp and an Update
- setUps cannot call anything, they can only add listeners. The listeners may call updates
- updates are responsible solely for the state of the component itself, and cannot call imported updates
- thus, the only condition to prevent infinite loops is to ensure no updates within a file call each other recursively

- only the colorpicker can change the colormap
- the colorpicker is nonetheless affected by the name fields
- the name field edits are not implemented at this moment since there are validation rules for a successful edit
- the colormap has no rules, in essence