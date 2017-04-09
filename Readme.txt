This is a simple implementation of the board game Connect Four in C++.

There are 2 versions: one that operates purely on the console, and one that makes use of the Windows 10 SDK and has a graphics interface. 

Update: Couldn't get the Windows Universal App to work, so took the codebase in C++ and recoded in Javascript and programmed an HTML and CSS GUI. 
The code is almost identical to the one in C++. 

C++ Instructions:
1. To open the exe, simply download the exe file from the Debug folder of the Console folder. 
2. To run it in Visual Studio, please use the sln file. 

Javascript Instructions (With GUI):
1. Download all files in With GUI folder (and make sure HTML, CSS, and Javascript are all in the same directory).
2. Open the HTML file in an web browser (only tested for Chrome).

I would like to thank the authors who published the following resources:
1. http://web.cs.ucla.edu/~rosen/161/notes/alphabeta.html - Alpha Beta Pruning
2. http://eloquentjavascript.net/ - Learning Javascript to implement a GUI and converting C++ code to Javascript code. 

Note: For some reason, Visual Studio seems to run this program much more slowly than other IDEs. So, I have also included a C++ folder where 
the same files are placed (with the maximum depth set to 7 as opposed to 6) so it will be easier for you to compile it with another IDE and see 
it work much faster. 