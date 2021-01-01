Text Adventure - Project 2
==================================================================================================================================
==================================================================================================================================
INCLUDED FILES

Source files (.c, .h)
-items.h
-rooms.h
-items.c
-rooms.c
-adventure.c

README.txt
makefile

To compile file, type - make
To run file, type - ./make

==================================================================================================================================
==================================================================================================================================
ABOUT

This is a program which allows a user to play a text-based adventure game. 
In my implementation of this project, the aim of the game is to escape from an abandoned prison using objects scattered
around the map in clever ways. This can be achieved through the use of preset commands.


For the creation of the room layout/map, a linked-list of structs was used with struct variables being pointers that
pointed to rooms connected in different directions. This allowed for simple 3-dimensional map creation, while also
allowing for a modular and easily expandable map.

Similarly, a linked-list of structs was used to represent the items present in the game. Once again, this allowed for
easy expansion in case the number of items needed to be increased, and also reusability. The player's inventory is an
example of this, as it reuses the same code which defines the item list.
However, traversal through the item linked-list for dropping, taking or using items was difficult compared to 
the usability of an array-based list, and traversal is probably also not as efficient compared to some array traversal methods.

All the linked-lists of structs used in the program are dynamically allocated memory when initialized,
and freed at the end of the game.

Functions adjusting or accessing struct variable values in regards to the item list or room list were separated into
their own files, respectively items.c and rooms.c (with headers containing prototypes). 
However, all code required to design a unique adventure game was separated into adventure.c. 
This was done to further incorporate modularity into the program (as specified in the project profile).

Extensive formatting was required to make the run-time environment as aesthetically pleasing as possible.


During run-time, the game prompts the user to input certain commands which allows their avatar to interact with the game world.
These commands include -
look - gives user a list of all items in the room with descriptions
location - gives user a decription of the room they are currently in
go [direction] - allows user to navigate between rooms freely
take[item] - users can pick up items in the room and items get placed in their inventory
drop[item] - users can drop items from their inventory into the room (can be picked back up)
use[item] - users can use items which have special functions, or are required to traverse a room
inventory - gives user a list of all items in their inventory with descriptions
help - gives user a list of valid commands and their functions


==================================================================================================================================
==================================================================================================================================
FUNCTIONS
(and Structs)

struct Item
        contains the pointers for name, description, quantity and next item for each item in the game

struct Item *item(char *, char *,int , struct Item *)
        creates and returns a pointer struct containing item information and allocates memory for the struct

struct Item *itemList(int, int, int, int, int, int)
        creates and returns a linked-list of all items in the game

void takeItem(struct Item *, struct Item *, char *)
        decrements the quantity of an item in a room and increments the quantity of an item in the player inventory
        (used when 'take [item]' is inputted)

int useItem(struct Item *, char *)
        checks if an item exists in the player's inventory and can be used for a specific purpose
        (used when 'use [item]' is inputted)

void dropItem(struct Item *, struct Item *, char *)
        increments the quantity of an item in a room and decrements the quantity of an item in the player inventory
        (used when 'drop [item]' is inputted)

void destItem(struct Item *, char *)
        decrements the quantity of an item in the player inventory (destroys)
        (used sometimes when 'use [item]' is inputted)

void listItems(struct Item *)
        prints all items in a Item linked list
        (usually used when 'inventory' is inputted)

void freeItems(struct Item*)
        frees all memory used by an Item linked list in the program
        (called after game is over)


struct Room
        contains the pointers for description, items, and all directions for each room

struct Room *createRoom(char *, struct Item *, struct Room *, struct Room *, struct Room *, struct Room *, struct Room *, struct Room *)
        creates and returns a pointer struct containing room information and allocates memory for the struct
        linked-list is formed later in main()

struct Room *traverseNorth(struct Room *)
        updates current room to room north of current room

struct Room *traverseSouth(struct Room *)
        updates current room to room south of current room

struct Room *traverseEast(struct Room *)
        updates current room to room east of current room

struct Room *traverseWest(struct Room *)
        updates current room to room west of current room

struct Room *traverseUp(struct Room *)
        updates current room to room above current room

struct Room *traverseDown(struct Room *)
        updates current room to room below current room

        (All of these are called when 'go [direction]' is inputted by user)

void look(struct Item *)
        lists all item names and descriptions within current room
        (used when 'look' is inputted)
    
void freeRooms(struct Room*)
        frees all memory used by a Room linked list in the program
        (called after game is over)


==================================================================================================================================
==================================================================================================================================

Link to video - https://youtu.be/msRuAIcaPU0

==================================================================================================================================
==================================================================================================================================