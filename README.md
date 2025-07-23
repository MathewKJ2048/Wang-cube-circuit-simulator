# Wang-cube-circuit-simulator


A tool to simulate digital circuits using Wang cubes

## Design decisions:

camera - an object with a zoom level, x and y
tiles are present in integer coordinates

tiletype:
name
color
up, down, left, right, front, back - strings

tile:
type = tiletype object
location = integer coordinates
left_neighbour, ... references to other tiles

circuit:
name
a collection of tiles

context:
collection of circuits, tiletypes and saved circuits

UI elements:

zoom in
zoom out


## User stories:

- enter with a sample tiling, sample tiletype etc
- save and load files with config
- zoom in and out
- search for a tiletype and see it displayed
- add a new tiletype and see errors instantly show up
- delete a tiletype and see it instantly updated in the screen