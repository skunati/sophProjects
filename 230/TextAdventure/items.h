#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Item
{
	char *name;
	char *description;
    int quantity;
	struct Item *next;
};

struct Item *item(char *, char *,int , struct Item *);
struct Item *itemList(int, int, int, int, int, int);

void takeItem(struct Item *, struct Item *, char *);
int useItem(struct Item *, char *);
void dropItem(struct Item *, struct Item *, char *);
void destItem(struct Item *, char *);
void listItems(struct Item *);
void freeItems(struct Item*);
