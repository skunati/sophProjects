#include "rooms.h"
#include "items.h"


struct Room *createRoom(char *description, struct Item *items, struct Room *north, struct Room *south, struct Room *east, struct Room *west, struct Room *up, struct Room *down)
{
    struct Room *result = (struct Room *)malloc(sizeof(struct Room));
    result->description = description;
    result->items = items;
    result->north = north;
    result->south = south;
    result->east = east;
    result->west = west;
    result->up = up;
    result->down = down;
    return result;
}


struct Room *traverseNorth(struct Room *current)
{
    if (current->north == NULL) 
    {
        printf("%s","You cannot move in that direction currently.");
        return current;
    }
    printf("%s",current->north->description);
    return current->north;
}

struct Room *traverseSouth(struct Room *current)
{
    if (current->south == NULL) 
    {
        printf("%s","You cannot move in that direction currently.");
        return current;
    }
    printf("%s",current->south->description);
    return current->south;
}

struct Room *traverseEast(struct Room *current)
{
    if (current->east == NULL) 
    {
        printf("%s","You cannot move in that direction currently.");
        return current;
    }
    printf("%s",current->east->description);
    return current->east;
}

struct Room *traverseWest(struct Room *current)
{   
    if (current->west == NULL) 
    {
        printf("%s","You cannot move in that direction currently.");
        return current;
    }
    printf("%s",current->west->description);
    return current->west;
}

struct Room *traverseUp(struct Room *current)
{
    if (current->up == NULL) 
    {
        printf("%s","You cannot move in that direction currently.");
        return current;
    }
    printf("%s",current->up->description);
    return current->up;
}

struct Room *traverseDown(struct Room *current)
{
    if (current->down == NULL) 
    {
        printf("%s","You cannot move in that direction currently.");
        return current;
    }
    printf("%s",current->down->description);
    return current->down;
}

void look(struct Item *roomItems)
{
    printf("%s","After looking around the room, you find");
    int count = 0;
    struct Item *temp = (struct Item *)malloc(sizeof(struct Item));
    temp = roomItems;
    while (temp!=NULL)
    {
        if (temp->quantity > 0)
        {
            if (count == 0) {printf("\n\n");}
            printf("%i %s\n\n", temp->quantity, temp->description);
            count++;
        }
        temp = temp->next;
    }
    if (count == 0) {printf("%s\n\n"," nothing of interest.");}
    free(temp);
    temp = NULL;
    return;
}


void freeRooms(struct Room* head)
{
    if (head == NULL) {return;}
  
    freeRooms(head->freeList);
    freeItems(head->items);
    free(head);
    head = NULL;
}
