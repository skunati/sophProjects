Connect Four - Project 1
==================================================================================================================================
==================================================================================================================================
ABOUT

This is a program which allows a user to play Connect Four against an AI.

A 2-dimensional array is used to save the board state the moves the AI plays relies on the 
positional values of previous moves stored in the array.

The program starts by giving the player the choice to pick who gets the starting move.
Based on this choice, the AI either starts the game by playing a random move, or the player 
is asked to play a move.

The program then checks for possible winning or losing situations (3 in a row, etc.) and if 
such a combination exists, the AI plays an offensive or defensive move accordingly.
The AI's move is based on board checks that occur every turn.

AI moves are determined in this order of priority: play defensive move if player has 3 tokens out of 4, 
attack if there are 3 of it's own tokens out of 4, randomly place a token on the board.
The program then checks if there are any winning positions; if not, it repeats the cycle.

==================================================================================================================================
==================================================================================================================================
FUNCTIONS

drawBoard()
	Prints the board by accessing values from the 2d array that stores positions of all tokens

initBoard()
	Resets the board and replaces all values in 2d array with '.' character (empty space)

winMessage(char token)
	Takes a character as an argument, and displays a winning message for the token denoted by that character

compMove()
	Adds the AI's move to the board, finds suitable position using horizCheck(), vertCheck(),
	diagCheck1(), diagCheck2() and rand() functions

horizCheck()
	Checks the board for any horizontal threatening (3 of 4 spaces)
	or game winning (4 of 4 spaces) combinations

vertCheck()
	Checks the board for any vertical threatening (3 of 4 spaces)
	or game winning (4 of 4 spaces) combinations

diagCheck1()
	Checks the board for any diagonal (top left to bottom right) threatening (3 of 4 spaces)
	or game winning (4 of 4 spaces) combinations

diagCheck2()
	Checks the board for any diagonal (top right to bottom left) threatening (3 of 4 spaces)
	or game winning (4 of 4 spaces) combinations

winCheck()
	Returns a value to main if there is a winning combination on the board. Finds this combination
	through the checking functions

choiceIndex(char letter)
	Converts a column letter character to its integer equivalent, and returns it

playerMoveChoice()
	Requests a move from the player

addChoice(int move, char token)
	Adds a move to the board, used for both AI and player moves

startChoice()
	Used at the beginning of the game to ask the user to determine who plays the starting move

==================================================================================================================================
==================================================================================================================================

Link to video -

https://youtu.be/MQNQo_FRvv8 

==================================================================================================================================
==================================================================================================================================

