/*
	Defines the Human Player Object. 
*/

#pragma once

//Forward declares necessary classes.
class Board;
class AI;

class Human {
public:
	//Constructors. 
	Human(Board& game_init);
	Human(int player_init, Board& game_init);

	//Allows the human to make a move. 
	void play(int column);

private:
	//Needs an indication if Human is X or O and a pointer to the game board. 
	int player;
	Board* game_ptr;
	const int BOARD_ROWS = 6;
	const int BOARD_COLS = 7;

	//Evaluates the current state of the board. This is used by AI. 
	int evaluate(const Board* const game_board);

	//Helper functions for evaluate. 
	int possible_diagonal();
	int possible_vertical();
	int possible_horizontal();
	bool possible_four(int a, int b, int c, int d);

	//Allows AI to access private variables. 
	friend class AI;
};