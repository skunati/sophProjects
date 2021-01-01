#include "wordfreak.h"

char space[] = " ";
char nullchar[] = "";
char * envVar;
struct wordList *words;


int main(int argc, char *argv[])
{
	int fp;
  
	if (argc == 1)
	{
	envVar = getenv("WORD_FREAK");   
    
	if (envVar == NULL){fp = 0;}    
    else {fp = open(envVar, O_RDONLY);}
	}  
  
	else {fp = open(argv[1], O_RDONLY);}

  	char *tempword = (char *)calloc(24, sizeof(char));
  	char *data = (char *)malloc(sizeof(char));
	words = (struct wordList *)malloc(sizeof(struct wordList) + sizeof(char) + 1);
  	words->count = 0;
  	words->next = NULL;
  	strcpy(words->word, space);

  	int bytes;

	bytes = read(fp, data, 1);

  	while (bytes >= 1)
	{
		alphCheck(data, tempword);
		bytes = read(fp, data, 1);
	}

  	close(3);
  	printWords(words);
  	freeMem(words);
	}


void printWords(struct wordList *words)
	{
  	struct wordList *current = words;
  	printf("\n");
  	while (current != NULL)
  	{
    	printf("\n");
    	printf("%s", current->word);
    	printf("               %i", current->count);
    	current = current->next;
  	}
  	printf("\n");
	}


void alphCheck(char *data, char *tword)
{
	printf("%s", data);
    
    if(isalpha(data[0])) {strcat(tword, data);}
    
    else
    {
      	addWord(tword);
      	free(tword);
      	tword = (char *)calloc(24, sizeof(char));
    }
}


void addWord(char *word)
{
  	
	if (strcmp(word, nullchar) == 0) {return;}
  
  	if (strcmp(words->word, space) == 0)
  	{
    	words = (struct wordList *)malloc(sizeof(struct wordList) + sizeof(char)*strlen(word) + 1);
		strcpy(words->word, word);
		words->count = 1;
		words->next = NULL;
		return;
  	}
 
	struct wordList *current = words;
	
	while (current != NULL)
	{
		if (strcmp(current->word, word) == 0)
		{
			current->count++;
			break;
		}
		else if (current->next == NULL)
		{
			struct wordList *temp = (struct wordList *)malloc(sizeof(struct wordList) + sizeof(char)*strlen(word) + 1);
			current->next = temp;
			temp->count = 1;
			temp->next = NULL;
			strcpy(temp->word, word);
			break;
		}
		current = current->next;
	}	
}


void freeMem(struct wordList *words)
{
  	if (words != NULL)
  	{
    	freeMem(words->next);
    	free(words);
  	}
  	return;
}