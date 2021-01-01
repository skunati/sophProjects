#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <semaphore.h>

#define NUM_OPERATORS 3
#define NUM_LINES 5

int next_id = 0;
sem_t operatorSem;    //semaphore defined for operators
sem_t ticketSem;      //semaphore defined for sold tickets
sem_t connected_lock; //semaphore defined for connected caller
int soldCount = 0;    //count of tickets sold
void *phonecall(void *);

int main(int argc, char *argv[])
{
    int threadCount;
    sem_init(&operatorSem, 0, NUM_OPERATORS);
    sem_init(&connected_lock, 0, 1); //semaphores are initialized
    sem_init(&ticketSem, 0, 1);

    if (argc == 2)
    {
        threadCount = atoi(argv[1]); //setting value to int given in command line
        if (atoi(argv[1]) > 240)
        {
            threadCount = 240; //defaulting value larger than 240 to 240 as only 240 tickets are available
        }
    }  
    else
    {
        threadCount = 240; //defaulting value to 240 is no command line args are given
    }

    pthread_t calls[threadCount];

    for (int i = 0; i < threadCount; i++)
    {
        pthread_create(&calls[i], NULL, phonecall, NULL); //threads are initialized
    }

    for (int i = 0; i < threadCount; i++)
    {
        pthread_join(calls[i], NULL); //threads are joined
    }

    printf("%i tickets were sold to %i callers\n", threadCount, soldCount);

    sem_destroy(&operatorSem);
    sem_destroy(&connected_lock); //semaphores are destroyed
    sem_destroy(&ticketSem);
    return 0;
}

void *phonecall(void *vargp)
{
    static int connected = 0; //number of connected threads
    int loopCondition = 1;
    static sem_t operators;
    int curr_id = ++next_id;

    while (loopCondition) //simulating a call repeatedly trying to connect to a line until a free line exists
    {                    
        printf("An attempt to connect has been made by thread [%i]\n", curr_id);

        sem_wait(&connected_lock);
        if (connected == NUM_LINES) //if no open lines exist
        {
            printf("Thread [%i] is calling line, busy signal\n", curr_id);
            sleep(1);
        }
        else //if an open line exists
        {
            connected++; //incrementing number of currently connected calls
            loopCondition--; //breaks loop once call is connected
        }
        sem_post(&connected_lock);
    }
  
    printf("Thread [%i] has available line, call ringing\n", curr_id);
    sem_wait(&operatorSem);
    printf("Thread [%i] is speaking to an operator\n", curr_id);
    sleep(3); //simulates purchase of ticket by making calling thread sleep for 3 seconds
    printf("Thread [%i] has bought a ticket!\n", curr_id);
    sem_post(&operatorSem);
    printf("Thread [%i] has hung up\n", curr_id);

    sem_wait(&connected_lock); 
    connected--; //decrementing number of currently connected threads to allow for new thread to connect
    sem_post(&connected_lock);

    sem_wait(&ticketSem);
    soldCount++; //incrementing count of tickets sold
    sem_post(&ticketSem);
}