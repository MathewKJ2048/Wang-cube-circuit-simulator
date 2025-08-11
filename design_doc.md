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


## Edit policy:

- If a color is edited, it gets edited, that's it

PRUNE (Propagating Reductions Using Neighbourhood Elimination)

## UI policy

- When mode is look-around, the mouse moves around and drags etc, clicking has no effect
- When mode is in placedown, the tile is rendered and placed
- What is the relation between placedown and pick?
- suggestion - tight joining
- clicking mouse sets picked to null?
- or add a place button? The place button changes the cursor mode, and we need a guarantee that the place button doesn't allow the mode to shift when the pickedElement is null
- so there's coupling between pickedToken != null and mode = PLACEDOWN MODE
- in a sense, this is inevitable, since something needs to be picked for PLACEDOWN
- I suggest leaving the editor decoupled from this, so add a button


## Nomenclature:

- x-axis = width = left-right
- y-axis = height = up-down
- z-axis = depth = front-back
- plane tiling lies in xy plane
- x+ -> right
- y+ -> up
- z+ -> front
- time flows in the same direction as z


## Ideas for additions:

- add a "copy tile" and "rotate tile" buttons, for easy tile-generation, make it somewhat intelligent
- name consists of core and mods
- mods are a set of classes
- core determines the color
- 3D view mode and 2D edit mode
- search shows only cores, when selected it shows classes
- when a core is selected, it autocompletes the specific class
- class would be things like 0/1, vertical/horizontal/left/right etc

- use 11ty for a user manual
- actually no
- user manual is a completely separate repo with vitepress

- also when showing the to-be-placed, use a small variant of the tile, then do the placement, or use the outline for colors and place them (the latter sounds even better imo)




## Selection policy:

- there needs to be a selectedToken just like pickedToken, with the same type
- the goal of the selector is to assign a value to the selected token
- but no, the selected token needs to always be a planeTiling
- there is no need for it to be a tileType
- the selector itself contains of two vectors, each can either be null or not
- the selector is "null null" by default
- when the first click of the selector is done, it goes to <start> null
- then it goes to <start> <end> and also adds in the selected element as a separate plane-tiling
- switching mode results in a reset to the selector

## Cache-policy

- cache button is active when cache-able, inactive when not
- cache button makes sense based on main-plane-tiling and cached-plane-tiling, nothing else
- does not do redo undo stuff with tile types
- what edits the main plane tiling? edit, erase, paste, etc - so far the cache update has been applied to compute, place and erase. It needs to be applied to paste, delete and cut etc as well

## Selection mode:

- when in selection mode, selector start and end can be anything
- if in any other mode, the selector has to be null, null
- clipboard is decoupled from this all
- actually, the selector need not be null, null in all other modes
- it won't matter anyway, as long as shifting to select mode comes with a shift to null null

## Nomenclature:

- file (the file buttons)
- clipboard (the five clipboard buttons and selector)
- simulation (includes the animation)
- view (zoom and grid)
- mode (4 primary buttons)
- cache (reload and sync)

- editor (right side)
- picker (left side)
- preview (right top)

## States:

- by default, every one of the selection buttons are disabled
- if the selector is not null, null, the delete button, cut button and save button are enabled
- if the clipboard is not null, the paste button is enabled

- save button - adds it to the saved plane tilings, sets the picked token and updates editor and picker and also destroys the selector

- delete button - purges all selected tiles and destroys the selector

- copy button - destroys the selector, and sets the clipboard to the thing, and makes updates

- cut button - combination of copy and delete

- paste button - it's its own mode

- forbidden state - clipboard is null and the paste button is active