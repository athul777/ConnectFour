/*
	Defines the Computer Player or AI object. 
*/

#pragma once

#include "board.h"

//Forward declares Board and Human.
class Board;
class Human;

class AI {
public:
	//Defines constructors and the make_move function (which will recursively call minimax to determine where to play. 
	AI(Board& game_init);
	AI(int player_init, Board& game_init);
	AI(int player_init, Board& game_init, Human& human_init);
	void make_move(int current_player, Board* game_board);

private:
	//Needs a pointer to the board and to the human player. 
	int player;
	Board* game_ptr;
	Human* human_ptr;
	const int BOARD_ROWS = 6;
	const int BOARD_COLS = 7;
	
	//Play and revert are used for the computer to 'try' and 'think of' moves before playing them. 
	void play(int current_player, int column);
	void revert(int current_player, int column);

	//Checks if a move is valid.
	bool valid_move(int column);
	//Minimax algorithm basically performs a Depth First Search of all possible moves up to a certain depth. 
	int minimax(int alpha, int beta, int current_player, Board* game_board, int depth);

	//All functions to aid the computation of the heuristic. 
	int evaluate(const Board* const game_board);
	int possible_diagonal();
	int possible_vertical();
	int possible_horizontal();
	bool possible_four(int a, int b, int c, int d);
};
