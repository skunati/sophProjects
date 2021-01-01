Threads and Synchronization - Project 4
==================================================================================================================================
==================================================================================================================================
INCLUDED FILES

jimmy_fallon.c
README.txt
makefile

To compile file, type - make
To run file, type - ./jimmy_fallon [number of callers]

==================================================================================================================================
==================================================================================================================================
ABOUT

This is a program which simulates ticket sales through phone calls split across 5 lines and 3 operators. In
my implementation, the number of callers can be specified as a command line argument (however it cannot
exceed 240, as that is the max amount of tickets). The threads are all created and joined, and each thread 
simulates a caller. The phonecall() function handles the threads, and simulates the call lines, checking if any 
free lines are available, and then connects the call to an operator. A while loop is used to simulate repeated calls.
The function also invokes sleep() to simulate ticket purchases. It uses semaphores to protect any critical 
regions of code in the program and restrict resource use. The state of each thread (caller) is printed, 
such as when it holds when operators are busy, connects, or buys a ticket. 
After the tickets are sold, the semaphores are destroyed and the threads are joined (in main()). 


==================================================================================================================================
==================================================================================================================================

Link to video - https://youtu.be/Qe9vr7_TswM
==================================================================================================================================
==================================================================================================================================