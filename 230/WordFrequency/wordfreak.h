#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <ctype.h>

struct wordList
{
  int count;
  struct wordList *next;
  char word[];

};

void alphCheck(char *, char *);
void addWord(char *);
void printWords(struct wordList *);
void freeMem(struct wordList *);

