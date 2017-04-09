#include "ai.h"
#include "human.h"

//Returns a score based on a heuristic that calculates the number of possible connect fours for each player in a given position. 
//This heuristic gives more weight to diagonal and horizontal fours compared to vertical ones. 
int AI::evaluate(const Board* const game_board) {
	int num_diagonal = possible_diagonal();
	int num_horizontal = possible_horizontal();
	int num_vertical = possible_vertical();
	int human_evaluate = human_ptr->evaluate(game_board);
	return human_evaluate - (3 * num_diagonal) - (2 * num_horizontal) - num_vertical;
}

//Given 4 adjacent positions on the board, checks if a connect four is possible for any player. 
bool AI::possible_four(int a, int b, int c, int d) {
	if ((game_ptr->board[a] == 0 || game_ptr->board[a] == player) && (game_ptr->board[b] == 0 || game_ptr->board[b] == player)
		&& (game_ptr->board[c] == 0 || game_ptr->board[c] == player) && (game_ptr->board[d] == 0 || game_ptr->board[d] == player)) {
		return true;
	}

	return false;
}

//Finds the total number of possible diagonal connect fours. 
int AI::possible_diagonal() {
	int score = 0;
	int position_right, position_left;
	const int rightjump = 10;
	const int leftjump = 8;
	for (int r = 0; r < BOARD_ROWS - 3; ++r) {
		for (int c = 0; c < BOARD_COLS - 3; ++c) {
			position_right = ((BOARD_COLS + 2) * r) + c + 10;
			if (possible_four(position_right, position_right + rightjump, position_right + rightjump * 2, position_right + rightjump * 3)) {
				score += 1;
			}
		}
	}

	for (int r = 0; r < BOARD_ROWS - 2; ++r) {
		for (int c = 2; c < BOARD_COLS; ++c) {
			position_left = ((BOARD_COLS + 2) * r) + c + 10;
			if (possible_four(position_left, position_left + leftjump, position_left + leftjump * 2, position_left + leftjump * 3)) {
				score += 1;
			}
		}
	}

	return score;
}

//Finds the total number of possible horizontal connect fours. 
int AI::possible_horizontal() {
	int score = 0;
	int position;
	const int jump = 1;
	for (int r = 0; r < BOARD_ROWS; ++r) {
		for (int c = 0; c < BOARD_COLS - 2; ++c) {
			position = ((BOARD_COLS + 2) * r) + c + 10;
			if (possible_four(position, position + jump, position + jump * 2, position + jump * 3)) {
				score += 1;
			}
		}
	}

	return score;
}

//Finds the total number of possible vertical connect fours.
int AI::possible_vertical() {
	int score = 0;
	int position;
	const int jump = 9;
	for (int r = 0; r < BOARD_ROWS - 2; ++r) {
		for (int c = 0; c < BOARD_COLS; ++c) {
			position = ((BOARD_COLS + 2) * r) + c + 10;
			if (possible_four(position, position + jump, position + jump * 2, position + jump * 3)) {
				score += 1;
			}
		}
	}

	return score;
}