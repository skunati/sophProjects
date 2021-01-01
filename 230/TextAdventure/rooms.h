#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Room
{
  char *description;
  struct Item *items;
  struct Room *north;
  struct Room *south;
  struct Room *east;
  struct Room *west;
  struct Room *up;
  struct Room *down;
  struct Room *freeList;
};

struct Room *createRoom(char *, struct Item *, struct Room *, struct Room *, struct Room *, struct Room *, struct Room *, struct Room *);

struct Room *traverseNorth(struct Room *);
struct Room *traverseSouth(struct Room *);
struct Room *traverseEast(struct Room *);
struct Room *traverseWest(struct Room *);
struct Room *traverseUp(struct Room *);
struct Room *traverseDown(struct Room *);

void look(struct Item *);
void freeRooms(struct Room*);
