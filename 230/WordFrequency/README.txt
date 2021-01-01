WORD FREAK - Project 3 CS230
==================================================================================================================================
==================================================================================================================================
INCLUDED FILES

Source files (.c, .h)
-wordfreak.h
-wordfreak.c


README.txt
makefile

To compile file, type - make
To run file, type - ./make

==================================================================================================================================
==================================================================================================================================
ABOUT

This is a program which allows users to find the frequency of all words in any text file, given the path or name(if in same
directory).

The program reads and parses through a file using system calls such as read(), and lseek().

A linked list implementation is used, due to its simplicity and relative efficiency. Memory is 
dynamically allocated and freed for this implementation.

The linked list of structs stores each unique word encountered and updates the count of that word if it is
encountered again.

The program also automatically disregards any non-alphanumeric characters to reduce the complexity of words
and also differentiate between words.

==================================================================================================================================
==================================================================================================================================
FUNCTIONS
(and Structs)

void alphCheck(char *, char *)
	This function uses external library function calls such as isalpha() to check for alphabets in
	the characters read from the buffer from the file.

void addWord(char *word)
	This function adds unique words to the linked list, and updates the count of each word which already
	exists in the linked list.

void printWords(struct wordList *)
	This function prints all the words and their frequency in the text file.

void freeMem(struct wordList *)
	This is the last function which is called; it frees all the dynamically allocated memory used
	for linked lists, buffers, and arrays

struct wordList
	This is the struct which is forms the linked list. It contains a character array containing the word,
	the count of that word and the next struct in the linked list

==================================================================================================================================
==================================================================================================================================

Link to video - https://www.youtube.com/watch?v=4d87u1Ih8GU

==================================================================================================================================
==================================================================================================================================