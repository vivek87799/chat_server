1) Chatserver built using nodejs with express framework
2) The server starts from index.js file
3) The view is served from the view folder
4) The chat history is persistant and stored in a JSON format under db folder as chathistory.json
5) The docker file has been attached along
6) The application runs on port 9001
7) While running the container it is recomended to use the same port 9001 as the client listens to the same

Docker build and run:
$docker build -t <your username>/chat-server .
$docker run -p xxxx:9001 -d <your username>/chat-server