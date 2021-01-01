#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <ctype.h>
#include <netdb.h>
#include <netinet/in.h>
#include <sys/types.h>
#include <unistd.h>

#define BUFMAX 8192

int OpenClient(char *, int);
int ComputeOperation(char *);


int main(int argc, char **argv)
{
    int clientfd;
    int port;
    char *host;
    char buffer[BUFMAX];

    if (argc != 4)
    {
        fprintf(stderr, "usage: %s <netID> <port> <host>\n", argv[0]);
        exit(0);
    }

    port = atoi(argv[2]);
    host = argv[3];

    clientfd = OpenClient(host, port);

    char message[] = "cs230 HELLO skunati@umass.edu\n";

    int firstNo;
    int secondNo;
    char op;
    char status[6];
    char cs230[5];

    send(clientfd, message, strlen(message), 0);

    while (recv(clientfd, buffer, sizeof(buffer), 0) != 0)
    {
        sscanf(buffer, "%s %s %d %c %d", cs230, status, &firstNo, &op, &secondNo);
        printf("%s", buffer);
        sprintf(message, "cs230 %d\n", ComputeOperation(buffer));
        send(clientfd, message, strlen(message), 0);
        printf("%s", message);
    }
    printf("DONE\n");

    close(clientfd);
    exit(0);
}

int OpenClient(char *hostname, int port)
{
    struct hostent *hostName;
    struct sockaddr_in serverAddress;
    int clientfd;

    printf("Echo Client is creating a socket.\n");

    if ((clientfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
        return -1;

    if ((hostName = gethostbyname(hostname)) == NULL)
        return -2;

    bzero((char *)&serverAddress, sizeof(serverAddress));

    serverAddress.sin_family = AF_INET;

    bcopy((char *)hostName->h_addr_list[0], (char *)&serverAddress.sin_addr.s_addr,
          hostName->h_length);

    serverAddress.sin_port = htons(port);

    printf("Echo Client is trying to connect to %s (%s:%d).\n", hostname,
           inet_ntoa(serverAddress.sin_addr), port);

    if (connect(clientfd, (struct sockaddr *)&serverAddress, sizeof(serverAddress)) < 0)
        return -1;

    printf("Echo Client connected.\n");
    return clientfd;
}

int ComputeOperation(char *buffer)
{
    char *retStr[5];
    char tempChar[] = {' '};
    char *bufferChar = strtok(buffer, tempChar);
    int index = 0;
    
    while (bufferChar != NULL)
    {
        retStr[index] = bufferChar;
        index++;
        bufferChar = strtok(NULL, tempChar);
    }
    int x = atoi(retStr[2]);
    int y = atoi(retStr[4]);
    int ans;
    
    if (strcmp(retStr[3], "+") == 0) {ans = x + y;}
    else if (strcmp(retStr[3], "-") == 0) {ans = x - y;}
    else if (strcmp(retStr[3], "*") == 0) {ans = x * y;}
    else if (strcmp(retStr[3], "/") == 0) {ans = x / y;}
    return ans;
}
