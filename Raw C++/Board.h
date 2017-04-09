/*
	Defines the Board Object. 
*/

#pragma once

#include <vector>

//Forward declares necessary classes. 
class Human;
class AI;

class Board {
public:
	//Constructors
	Board();
	Board(std::vector<int> vec_init);

	//Determines whether the board in its current state is a win (for either player) or a draw. 
	bool terminal();

	//Prints the board to the console. 
	void print();

private:
	//Stores a vector representation of the board. 
	std::vector<int> board;
	const int BOARD_ROWS = 6;
	const int BOARD_COLS = 7;

	//Checks if an index is in the board. This will be exaplained in detail in the cpp file. 
	bool index_in_board(int index);

	//Helper functions to check if the board is terminal. 
	int checkWin();
	int checkDraw();
	int checkFour(int a, int b, int c, int d);
	int horizontalCheck();
	int verticalCheck();
	int diagonalCheck();

	//Allows these classes to access private variables. 
	friend class Human;
	friend class AI;
};

/*
	How the board is stored:
	The board is not simply a 6x7 or 42 element vector, but actually adds an extra row and column to enable to check the possible number of connect fours easier when there are a sequence 
	of three in a row at the edge of the board. So, instead, we have an 7x8 board or a 56 element vector and perform a check to see if the respective index is actually in the playing part of the board. 
*/