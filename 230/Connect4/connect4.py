#include <stdio.h>
#include <stdlib.h>
#include <time.h> 


char userToken;
char compToken;
#define ROWS 6
#define COLUMNS 7
char board[ROWS][COLUMNS];

void drawBoard();
void initBoard();
int winMessage(char token);
void compMove();
int horizCheck();
int vertCheck();
int diagCheck1(int i, int j);
int diagCheck2(int i, int j);
int winCheck();
int choiceIndex(char letter);
int playerMoveChoice();
void addChoice(int move, char token);
int startChoice();


void drawBoard()  //Prints the board by accessing values from the 2d array that stores positions of all tokens
{
	printf("\n");	
	printf("%s","  A B C D E F G");
	printf("\n");
	
	for (int i=0; i<ROWS; i++)
	{
		printf("%i", i+1);
		printf("%c", ' ');
		
		for (int j=0; j<COLUMNS; j++)
		{
			printf("%c", board[i][j]);
			printf("%c", ' ');
		}
		
		printf("\n");
	}
}


void initBoard() //Resets the board and replaces all values in 2d array with '.' character (empty space)
{
	for (int i=0; i<ROWS; i++)
	{
		for (int j=0; j<COLUMNS; j++)
		{
			board[i][j] = '.';
		}
	}
}


void addChoice(int move, char token) //Adds a move to the board, used for both AI and player moves
{
	for (int i=ROWS; i>-1; i--)
	{
		if((board[i][move]) == '.')
		{
			board[i][move] = token;
			break;
		}
	}
}


int winMessage(char token) //Takes a character as an argument, and displays a winning message for the token denoted by that character
{
	printf("\n");
	printf("%s","---Game over---");
	printf("\n");
	printf(" %c", token);
	printf("%s", " wins!");
	printf("\n");
}

void compMove() //Adds the AI's move to the board, finds suitable position using horizCheck(), vertCheck(),diagCheck1(), diagCheck2() and rand() functions
{
	printf("\n");
	printf("%s", "AI's turn");
	printf("\n");
	if (horizCheck() > 0) 
	{
		addChoice(horizCheck(),compToken);
	}
	else if (vertCheck() > 0)
	{
		addChoice(vertCheck(),compToken);
	}
	else 
	{
		int randInt = rand()%7;
		addChoice(randInt,compToken);
	}
}


int horizCheck() //Checks the board for any horizontal threatening (3 of 4 spaces) or game winning (4 of 4 spaces) combinations
{
	for (int i=0; i<ROWS; i++)
	{
		for (int j=0; j<COLUMNS-3; j++) 
		{
			{
				if (((board[i][j]==userToken) && (board[i][j+1]==userToken) && (board[i][j+2]==userToken) && (board[i][j+3]==userToken)) ||
				((board[i][j]==compToken) && (board[i][j+1]==compToken) && (board[i][j+2]==compToken) && (board[i][j+3]==compToken)))
				{
					return -1;
				}
				if (((board[i][j]==userToken) && (board[i][j+1]=='.') && (board[i][j+2]==userToken) && (board[i][j+3]==userToken)) ||
				((board[i][j]==compToken) && (board[i][j+1]=='.') && (board[i][j+2]==compToken) && (board[i][j+3]==compToken)))
				{
					return j+1;
				}
				if (((board[i][j]==userToken) && (board[i][j+1]==userToken) && (board[i][j+2]=='.') && (board[i][j+3]==userToken)) ||
				((board[i][j]==compToken) && (board[i][j+1]==compToken) && (board[i][j+2]=='.') && (board[i][j+3]==compToken)))
				{
					return j+2;
				}
				if (((board[i][j]==userToken) && (board[i][j+1]==userToken) && (board[i][j+2]==userToken) && (board[i][j+3]=='.')) ||
				((board[i][j]==compToken) && (board[i][j+1]==compToken) && (board[i][j+2]==compToken) && (board[i][j+3]=='.')))
				{
					return j+3;
				}
				if (((board[i][j]=='.') && (board[i][j+1]==userToken) && (board[i][j+2]==userToken) && (board[i][j+3]==userToken)) ||
				((board[i][j]=='.') && (board[i][j+1]==compToken) && (board[i][j+2]==compToken) && (board[i][j+3]==compToken)))
				{
					return j;
				}
			}
		}
	}

	return 0;
}

int vertCheck() //Checks the board for any vertical threatening (3 of 4 spaces)or game winning (4 of 4 spaces) combinations
{
	for (int i=0; i<ROWS; i++)
	{
		for (int j=0; j<COLUMNS-3; j++) 
		{
			{
				if (((board[i][j]==userToken) && (board[i+1][j]==userToken) && (board[i+2][j]==userToken) && (board[i+3][j]==userToken)) ||
				((board[i][j]==compToken) && (board[i+1][j]==compToken) && (board[i+2][j]==compToken) && (board[i+3][j]==compToken)))
				{
					return -1;
				}
				if (((board[i][j]=='.') && (board[i+1][j]==userToken) && (board[i+2][j]==userToken) && (board[i+3][j]==userToken)) ||
				((board[i][j]=='.') && (board[i+1][j]==compToken) && (board[i+2][j]==compToken) && (board[i+3][j]==compToken)))
				{
					return j;
				}
			}
		}
	}
	return 0;
}

int diagCheck1(int i, int j) //Checks the board for any diagonal (top left to bottom right) threatening (3 of 4 spaces) or game winning (4 of 4 spaces) combinations
{
	if ((i<3) && (j<4))
	{
		if (((board[i][j]==userToken) && (board[i+1][j+1]==userToken) && (board[i+2][j+2]==userToken) && (board[i+3][j+3]==userToken)) ||
			((board[i][j]==compToken) && (board[i+1][j+1]==compToken) && (board[i+2][j+2]==compToken) && (board[i+3][j+3]==compToken)))
		{
			return 5;
		}
	}
	return 0;
}

int diagCheck2(int i, int j) //Checks the board for any diagonal (top right to bottom left) threatening (3 of 4 spaces)or game winning (4 of 4 spaces) combinations
{
	if ((i<3) && (j>2))
	{
		if (((board[i][j]==userToken) && (board[i+1][j-1]==userToken) && (board[i+2][j-2]==userToken) && (board[i+3][j-3]==userToken)) ||
			((board[i][j]==compToken) && (board[i+1][j-1]==compToken) && (board[i+2][j-2]==compToken) && (board[i+3][j-3]==compToken)))
		{
			return 5;
		}
	}
	return 0;
}


int winCheck() //Returns a value to main if there is a winning combination on the board. Finds this combination through the checking functions
{
	for (int i=0; i<ROWS; i++)
	{
		for (int j=0; j<COLUMNS; j++) 
		{
			if 
			(
				(horizCheck(i,j) == -1) ||
				(vertCheck(i,j) == -1) ||
				(diagCheck1(i,j) == 5) ||
				(diagCheck2(i,j) == 5)
			)
			{
				winMessage(board[i][j]);
				return 1;
			}
		}
	}
	return 0;
}


int choiceIndex(char letter) //Converts a column letter character to its integer equivalent, and returns it
{
	switch(letter)
	{
		case 'A':
		case 'a': return 0;

		case 'B':
		case 'b': return 1;

		case 'C':
		case 'c': return 2;

		case 'D':
		case 'd': return 3;
		
		case 'E':
		case 'e': return 4;

		case 'F':
		case 'f': return 5;

		case 'G':
		case 'g': return 6;
	}
}


int playerMoveChoice() //Requests a move from the player
{
	printf("\n");
	printf("%s\n", "Choose the column which you want to place your disc in (A - G):");
	char pchoice;
	scanf(" %c", &pchoice);
	return choiceIndex(pchoice);
}


int startChoice() //Used at the beginning of the game to ask the user to determine who plays the starting move
{
	char fchoice;	
	printf("%s\n", "Choose who gets to go first (enter '1' for User or '2' for AI):");

	while (1) 
	{
		scanf("%s", &fchoice);
		
		switch (fchoice)
		{
			case '1':
				userToken = 'X';
				compToken = 'O';
				return 1;
			case '2':
				userToken = 'O';
				compToken = 'X';
				return 2;
			default:
				printf("%s\n", "Enter a valid option");
				break;
		}
		
	}
}


void main()
{
	int schoice = startChoice();
	initBoard();
	drawBoard();
	
	while (1) 
	{
		if (schoice == 1) 
		{
			srand(time(NULL));
			addChoice(playerMoveChoice(),userToken);
			drawBoard();
			if(winCheck() == 1)
				break;
			compMove();
			drawBoard();
			if(winCheck() == 1)
				break;
		}
		else
		{
			srand(time(NULL));
			compMove();
			drawBoard();
			if(winCheck() == 1)
				break;
			addChoice(playerMoveChoice(),userToken);
			drawBoard();
			if(winCheck() == 1)
				break;
		}
	}
}
