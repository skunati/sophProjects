#include "rooms.h"
#include "items.h"

int main()
{
	struct Item *inventory = item(NULL,NULL,0,NULL);
	inventory = itemList(0,0,0,0,0,0);

	struct Room *A1 = createRoom("You find yourself in what appears to be a run-down prison cell. You are not sure why or how\nyou got there, but you notice the door to the north side of the cell is wide open.\nAll you know is that you need to leave. Fast.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *A2 = createRoom("You appear to be in the hallway leading out of the cell, where guards would usually be stationed.\nIt seems like some equipment might be laying on the ground.\nThe hallway seems to continue in the same direction.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *A3 = createRoom("You seem to be in the room exiting the hallway. A grate appears to be covering a ladder in the floor.\nYou might be able to open it if you have the right tools.\nIf only there were some laying around.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);

	struct Room *B1 = createRoom("At the foot of the ladder, you notice garbage strewn all over the floor.\nNone of it seems to be particularly useful.\nThere seem to be multiple hallways leading in different directions.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *B2 = createRoom("As you walk down this hallway, you hear some haunting noises behind you.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *B3 = createRoom("You appear to be in some sort of laboratory.\nThere's probably something here that might help you later.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *B4 = createRoom("As you go down this hallway, you notice it switches direction to the right.\nThe building seems to have been constructed in a very convoluted way.\nSuddenly, you hear a sharp noise behind you. You should move quickly.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *B5 = createRoom("In this room, you notice another grate covering a ladder like before.\nSeems like this one can also be pried open",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);

	struct Room *C1 = createRoom("You appear to have landed on the ground floor of the facility,\nwhich looks like it hasn't been cleaned in years. The lights flicker. You should keep moving.\nSeems like the hall goes southwards.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *C2 = createRoom("The hallway you are in splits into two.\nIt may be wise to explore both ends in hopes of finding an exit.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *C3 = createRoom("You are now standing in a pitch black room. There is no way you could find your bearings here.\nPerhaps if there was a light source somewhere?",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *C4 = createRoom("As you enter the room, you see a tall chain-link fence dividing the room at it's center.\nThere also appears to be a south facing exit.\nIt seems unlikely, but you could attempt to scale it if you had some rope.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *C5 = createRoom("As you come into this room, you are blinded by a light coming from your left.\nThere's a door! And it looks like the sun is rising! The exit must be to your east.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *C6 = createRoom("You continue walking down the hallway.\nHopefully the exit is in this direction, or atleast some useful items.",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *C7 = createRoom("The room you are in seems to have been a server room of some kind.\nHowever, all the electronics look destroyed. Maybe something could be salvaged?",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);
	struct Room *C8 = createRoom("You're finally out! What was all that about? Time for questions later.\nCongratulations are due, you escaped the scary prison!",itemList(0,0,0,0,0,0),NULL,NULL,NULL,NULL,NULL,NULL);


	A1->north = A2;
	A2->south = A1;
	A2->north = A3;
	A3->south = A2;
	B1->up = A3; 
	B1->south = B2; 
	B2->north = B1; 
	B2->south = B3; 
	B3->north = B2; 
	B1->east = B4; 
	B4->west = B1;
	B4->south = B5; 
	B5->north = B4; 
	C1->up = B5;
	C1->south = C2; 
	C2->north = C1;  
	C2->west = C3;
	C3->east = C2; 
	C4->east = C3; 
	C5->east = C8; 
	C2->east = C6;
	C6->west = C2;
	C6->east = C7; 
	C7->west = C6;

	
	A1->items = itemList(0,0,0,0,1,0);
	A2->items = itemList(0,0,1,0,0,1);
	A3->items = itemList(1,0,0,0,0,1);
	B1->items = itemList(0,0,0,0,2,1);
	B2->items = itemList(0,0,0,0,1,0);
	B3->items = itemList(0,0,0,1,0,0);
	B4->items = itemList(0,0,0,0,0,1);
	B5->items = itemList(0,0,0,0,0,0);
	C1->items = itemList(0,0,0,0,1,0);
	C2->items = itemList(0,0,0,0,0,2);
	C3->items = itemList(0,0,0,0,1,1);
	C4->items = itemList(0,0,0,0,0,0);
	C5->items = itemList(0,0,0,0,1,0);
	C6->items = itemList(0,0,0,0,1,1);
	C7->items = itemList(0,1,0,0,0,0);
	C8->items = itemList(0,0,0,0,0,0);


	struct Room *current = A1;
	printf("\n\n");
	printf("%s\n\n\n","_____________________________________________________________________________________________________");
	printf("%s\n\n", "Welcome to Prison break! This is an adventure/light horror game where the player can input\ndifferent kinds of commands to progress through the game and finally escape the abandoned prison.");
	printf("%s\n\n", "The instructions are simple, just enter -");
	printf("%s\n", "'go [direction]' to travel in that direction (north,south,east,west,up,down)");
	printf("%s\n", "'look' to look around the room (please make sure to investigate your surroundings)");
	printf("%s\n", "'take [item name]' to take an item (note that you only have to enter the noun as item name)");
	printf("%s\n", "'drop [item name]' to drop an item");
	printf("%s\n", "'use [item name]' to use an item (to overcome obstacles)");
	printf("%s\n", "'inventory' to see your inventory");
	printf("%s\n\n", "and 'location' to repeat the description of the location.");
	printf("%s\n\n", "Make sure to use 'help' if you are stuck to see all the commands.");
	printf("%s\n\n", "Enjoy!");
	printf("%s\n\n\n","_____________________________________________________________________________________________________");
	printf("%s\n\n",current->description);

	while(1)
	{	

		printf("%s\n\n\n","_____________________________________________________________________________________________________");
		if (current == C8) {break;}
		printf("%s \n\n","What's your next move?");
		char input1[30];
		char input2[30];
		scanf("%s",input1);

		if (strcmp(input1,"help") == 0)
		{
			printf("\n");
			printf("%s\n\n", "The instructions are simple, just enter -");
			printf("%s\n", "'go [direction]' to travel in that direction");
			printf("%s\n", "'look' to look around the room (please make sure to investigate your surroundings)");
			printf("%s\n", "'take [item name]' to take an item (note that you only have to enter the noun as item name)");
			printf("%s\n", "'drop [item name]' to drop an item");
			printf("%s\n", "'use [item name]' to use an item(to overcome obstacles)");
			printf("%s\n", "'inventory' to see your inventory");
			printf("%s\n\n", "and 'location' to repeat the description of the location.");
			printf("%s\n\n", "Make sure to use 'help' if you are stuck to see all the commands.");

		}

		else if (strcmp(input1,"look") == 0)
		{
			printf("\n");
			if (current == C3) {printf("%s\n\n","The room is to dark to look for anything");}
			else {look(current->items);}
		}

		else if (strcmp(input1,"location") == 0)
		{
			printf("\n");
			printf("%s\n\n",current->description);
		}

		else if (strcmp(input1,"inventory") == 0)
		{
			listItems(inventory);
			printf("\n");
		}

		else if (strcmp(input1,"take") == 0)
		{
			scanf("%s",input2);
			takeItem(current->items,inventory,input2);
			printf("\n");
		}

		else if (strcmp(input1,"use") == 0)
		{
			scanf("%s",input2);
			if (useItem(inventory,input2))
			{
				if (strcmp(input2,"crowbar") == 0)
				{
					if (current == A3) 
					{
						A3->down = B1;
						printf("\n%s\n\n","You used the crowbar to pry the grate open");
					}
					else if (current == B5) 
					{
						B5->down = C1;
						printf("\n%s\n\n","You used the crowbar to pry the grate open");
					}
					else {printf("\n%s\n\n","Can't use the crowbar for anything here...");}
				}
				
				else if (strcmp(input2,"flashlight") == 0)
				{
					if (current == C3)
					{
						if (useItem(inventory,"battery")) 
						{
							C3->west = C4;
							printf("\n%s\n\n", "The room is now lit up");

						}
						else {printf("\n%s\n\n","The flashlight has no power...");}
					}
					else {printf("\n%s\n\n","No point in using the flashlight here...");}
				}
				
				else if (strcmp(input2,"cable") == 0)
				{
					if (current == C4)
					{
						C4->south = C5;
						destItem(inventory,"cable");
						printf("\n%s\n\n","You rappel over the fence using the cable. There's no turning back now.");
					}
					else {printf("\n%s\n\n","No use for the cable here...");}
				}

				else {printf("\n%s\n\n","Can't use that here...");}
			}
			else {printf("\n%s\n\n","That item isn't in your inventory...");}
		}

		else if (strcmp(input1,"drop") == 0)
		{
			scanf("%s",input2);
			dropItem(current->items,inventory,input2);
			printf("\n");
		}
	
		else if (strcmp(input1,"go") == 0)
		{
			scanf("%s",input2);
			if (strcmp(input2,"north") == 0) 
			{
				printf("\n");
				current = traverseNorth(current);
				printf("\n\n");
			}
			else if (strcmp(input2,"south") == 0) 
			{
				printf("\n");
				current = traverseSouth(current);
				printf("\n\n");
			}
			else if (strcmp(input2,"east") == 0) 
			{
				printf("\n");
				current = traverseEast(current);
				printf("\n\n");
				C3->west = NULL;
			}
			else if (strcmp(input2,"west") == 0) 
			{
				printf("\n");
				current = traverseWest(current);
				printf("\n\n");
				C3->west = NULL;
			}
			else if (strcmp(input2,"up") == 0) 
			{
				printf("\n");
				current = traverseUp(current);
				printf("\n\n");
			}
			else if (strcmp(input2,"down") == 0) 
			{
				printf("\n");
				current = traverseDown(current);
				printf("\n\n");
			}
		}
	}

	A1->freeList = A2;
	A2->freeList = A3;
	A3->freeList = B1;
	B1->freeList = B2;
	B2->freeList = B3;
	B3->freeList = B4;
	B4->freeList = B5;
	B5->freeList = C1;
	C1->freeList = C2;
	C2->freeList = C3;
	C3->freeList = C4;
	C4->freeList = C5;
	C5->freeList = C6;
	C6->freeList = C7;
	C7->freeList = C8;

	freeRooms(A1);
	freeItems(inventory);

	return 0;
}
