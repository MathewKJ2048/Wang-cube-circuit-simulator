# Wang-cube-circuit-simulator


A tool to simulate digital circuits using Wang cubes

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