#include "ai.h"

//Constructor
AI::AI(Board& game_init) {
	player = -1;
	game_ptr = &game_init;
}

//Constructor
AI::AI(int player_init, Board& game_init) {
	player = player_init;
	game_ptr = &game_init;
}

//Constructor
AI::AI(int player_init, Board &game_init, Human &human_init) {
	player = player_init;
	game_ptr = &game_init;
	human_ptr = &human_init;
}

/*
	Basically the same code as minimax. It initiates the move making process. 
*/
void AI::make_move(int current_player, Board* game_board) {
	//Defines max and min possible scores.
	int alpha = -2000;
	int beta = 2000;
	//The depth is initially 0. This will be incremented after every recursive call to minimax. 
	int depth = 0;
	//Defines the best possible score so far and a default position. 
	int best_score;
	int position = 4;

	//If player is X. 
	if (current_player == 1) {
		//We try to get a better score than alpha, so we default to alpha in the beginning. 
		best_score = alpha;
		//We basically perform all 7 (at most) possible moves. 
		for (int i = 1; i < 8; ++i) {
			//Only if i is a valid move.
			if (valid_move(i)) {
				//It plays the move i in the vector and simply recursively calls minimax to maximize (or minimize) its score and revert all moves.
				play(current_player, i);
				int score = minimax(best_score, beta, -current_player, game_board, depth);
				if (score > best_score) {
					//Score and position are stored. 
					best_score = score;
					position = i;
				}
				//Move is reverted. 
				revert(current_player, i);

				//Here we perform alpha beta pruning, which enables us to discard large sections of the Search Tree. 
				if (beta <= best_score) {
					break;
				}
			}
		}
	}

	//Same process as with 1. 
	else if (current_player == -1) {
		best_score = beta;
		for (int i = 1; i < 8; ++i) {
			if (valid_move(i)) {
				play(current_player, i);
				int score = minimax(alpha, best_score, -current_player, game_board, depth);
				if (score < best_score) {
					best_score = score;
					position = i;
				}
				revert(current_player, i);
				if (best_score <= alpha) {
					break;
				}
			}
		}
	}

	//After determining the best position (from the best score), it makes that move. 
	play(current_player, position);
}

//Changes the state of the board by adding current player to board. 
void AI::play(int current_player, int column) {
	int index = column + 54;
	while (index >= 10) {
		if (game_ptr->board[index] == 0) {
			game_ptr->board[index] = current_player;
			break;
		}
		else index -= 9;
	}
}

//Reverts a previous move by removing last pice from column. 
void AI::revert(int current_player, int column) {
	int index = column + 9;
	while (index <= 61) {
		if (game_ptr->board[index] == current_player) {
			game_ptr->board[index] = 0;
			break;
		}
		else index += 9;
	}
}

//Checks if a move is valid (ie the board doesn't overflow). 
bool AI::valid_move(int column) {
	int index = column + 54;
	while (index >= 10) {
		if (game_ptr->board[index] == 0) {
			return true;
		}
		else index -= 9;
	}

	return false;
}

//Almost identical to make_move, except we increment depth since it is being called recursively.
int AI::minimax(int alpha, int beta, int current_player, Board* game_board, int depth) {
	if (game_board->checkWin()) return current_player * -1000;
	else if (game_board->checkDraw()) return 0;

	if (depth == 6) {
		if (player == -1) return evaluate(game_board);
		else if (player == 1) return -(evaluate(game_board));
	}

	++depth;
	int best_score;

	if (current_player == 1) {
		best_score = alpha;
		for (int i = 1; i < 8; ++i) {
			if (valid_move(i)) {
				play(current_player, i);
				int score = minimax(best_score, beta, -current_player, game_board, depth);
				if (score > best_score) best_score = score;
				revert(current_player, i);
				if (beta <= best_score) {
					break;
				}
			}
		}
	}

	else if (current_player == -1) {
		best_score = beta;
		for (int i = 1; i < 8; ++i) {
			if (valid_move(i)) {
				play(current_player, i);
				int score = minimax(alpha, best_score, -current_player, game_board, depth);
				if (score < best_score) best_score = score;
				revert(current_player, i);
				if (best_score <= alpha) {
					break;
				}
			}
		}
	}

	return best_score;
}