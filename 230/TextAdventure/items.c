#include "items.h"
#include "rooms.h"


struct Item *item(char *name, char *description, int quantity, struct Item *next)
{
	struct Item *result = (struct Item *)malloc(sizeof(struct Item));
	result->name = name;
	result->description = description;
	result->quantity = quantity;
	result->next = next;
	return result;
}


struct Item *itemList(int a,int b,int c,int d,int e,int f)
{
	struct Item *crowbar = item("crowbar","old, worn crowbar. Might still be useful to pry something open.",0,NULL);
	struct Item *cable = item("cable","damaged cable. Could be used in many creative ways, like a rope.",0,NULL);
	struct Item *flashlight = item("flashlight","durable flashlight that can light up dark places (reuires battery).",0,NULL);
	struct Item *battery = item("battery","dusty battery. Holding this in your inventory powers your flashlight.",0,NULL);
	struct Item *rag = item("rag","dirty, torn rag(s). Doesn't seem like it would be particularly useful.",0,NULL);
	struct Item *can = item("can","empty soda can(s). It's empty and has jagged edges.",0,NULL);

	crowbar->next = cable;
	cable->next = flashlight;
	flashlight->next = battery;
	battery->next = rag;
	rag->next = can;

	crowbar->quantity = a;
	cable->quantity = b;
	flashlight->quantity = c;
	battery->quantity = d;
	rag->quantity = e;
	can->quantity = f;

	return crowbar;
}


void takeItem(struct Item *object, struct Item *player, char *name)
{
	if (object == NULL) {return;}
	if (strcmp(object->name, name) == 0)
	{
		if (object->quantity > 0)
		{
			object->quantity -= 1;
			player->quantity += 1;
			printf("\n");
			printf("%s %s\n","You took",name);
		}
		else {printf("%s","That item is not in the room.");}
	}
	takeItem(object->next, player->next, name);
}


int useItem(struct Item *player, char *name)
{
	if (player == NULL) {return;}
	if (strcmp(player->name, name) == 0)
	{
		if (player->quantity > 0)
		{
			return 1;
		}
		else 
		{
			return 0;	
		}
	}
	useItem(player->next, name);
}


void dropItem(struct Item *object, struct Item *player, char *name)
{
	if (player == NULL) {return;}
	if (strcmp(player->name, name) == 0)
	{
		if (player->quantity > 0)
		{
			object->quantity += 1;
			player->quantity -= 1;
			printf("\n");
			printf("%s %s\n","You dropped",name);
		}
		else {printf("%s","That item is not in your inventory");}
	}
	dropItem(object->next, player->next, name);
}


void destItem(struct Item *player, char *name)
{
	if (player == NULL) {return;}
	if (strcmp(player->name, name) == 0)
	{
		if (player->quantity > 0)
		{
			player->quantity -= 1;
			printf("\n");
		}
	}
	destItem(player->next, name);
}


void listItems(struct Item *player)
{
	if (player == NULL) {return;}
	if (player->quantity > 0)
	{
		printf("\n");
		printf("%s %i %s%s %s\n","You have",player->quantity,player->name,". A",player->description);
	}
	listItems(player->next);
}


void freeItems(struct Item* head)
{
	if (head == NULL) {return;}

	freeItems(head->next);

	free(head);
	head = NULL;
}
