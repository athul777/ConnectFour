#include <iostream>
#include "board.h"

//Constructor
Board::Board() {
	for (int i = 0; i < 72; ++i) {
		if (index_in_board(i)) board.push_back(0);
		else board.push_back(2);
	}
}

//COnstructor
Board::Board(std::vector<int> vec_init) {
	board = vec_init;
}

//Prints the state of the board to the console. 
void Board::print() {
	int counter = 0;

	for (int i = 0; i < 72; ++i) {
		if (index_in_board(i)) {
			++counter;
			if (board[i] == 0) std::cout << "-";
			else if (board[i] == 1) std::cout << "X";
			else if (board[i] == -1) std::cout << "O";
			std::cout << "\t";
			if (counter % 7 == 0) std::cout << "\n\n";
		}
	}
}

//Checks if a  given index is in the 6x7 board (within the 7x8 board representation). 
bool Board::index_in_board(int index) {
	if ((index >= 0 && index <= 9) || (index >= 62 && index <= 71) ||
		index == 17 || index == 18 || index == 26 || index == 27 || index == 35 ||
		index == 36 || index == 44 || index == 45 || index == 53 || index == 54) {

		return false;
	}

	else {
		return true;
	}
}

//Checks if a current board state is terminal, ie the game is drawn or won. 
bool Board::terminal() {
	return (checkDraw() || checkWin());
}

//Checks if a current state is won. 
int Board::checkWin() {
	return (horizontalCheck() || verticalCheck() || diagonalCheck());
}

//Checks if a current state is drawn. 
int Board::checkDraw() {
	if (!checkWin()) {
		int counter = 0;

		for (int i = 0; i < 72; ++i) {
			if (index_in_board(i) && board[i] != 0) {
				++counter;
			}
		}

		if (counter == 42) return 1;

		else return 0;
	}

	return 0;
}

//Checks if 4 adjacent positions on the board are occupied by the same player. 
int Board::checkFour(int a, int b, int c, int d) {
	return (board[a] == board[b] && board[b] == board[c] && board[c] == board[d] && board[a] != 0);
}

//Checks for all existing connect fours horizontally.
int Board::horizontalCheck() {
	int position;
	const int jump = 1;
	for (int r = 0; r < BOARD_ROWS; ++r) {
		for (int c = 0; c < BOARD_COLS - 3; ++c) {
			position = ((BOARD_COLS + 2) * r) + c + 10;
			if (checkFour(position, position + jump, position + jump * 2, position + jump * 3)) {
				return 1;
			}
		}
	}

	return 0;
}

//Checks for all existing connect fours vertically.
int Board::verticalCheck() {
	int position;
	const int jump = 9;
	for (int r = 0; r < BOARD_ROWS - 3; ++r) {
		for (int c = 0; c < BOARD_COLS; ++c) {
			position = ((BOARD_COLS + 2) * r) + c + 10;
			if (checkFour(position, position + jump, position + jump * 2, position + jump * 3)) {
				return 1;
			}
		}
	}

	return 0;
}

//Checks for all existing connect fours diagonally.
int Board::diagonalCheck() {
	int position_right, position_left;
	const int rightjump = 10;
	const int leftjump = 8;
	for (int r = 0; r < BOARD_ROWS - 3; ++r) {
		for (int c = 0; c < BOARD_COLS - 3; ++c) {
			position_right = ((BOARD_COLS + 2) * r) + c + 10;
			if (checkFour(position_right, position_right + rightjump, position_right + rightjump * 2, position_right + rightjump * 3)) {
				return 1;
			}
		}
	}

	for (int r = 0; r < BOARD_ROWS - 3; ++r) {
		for (int c = 3; c < BOARD_COLS; ++c) {
			position_left = ((BOARD_COLS + 2) * r) + c + 10;
			if (checkFour(position_left, position_left + leftjump, position_left + leftjump * 2, position_left + leftjump * 3)) {
				return 1;
			}
		}
	}

	return 0;
}