/*
	Name: Athul Ganesh
	UID: 604471849
	Description: C++ Connect Four with an implementation of the minimax algorithm with a heuristic that counts possible connect fours in a given board state.
*/

#include <iostream>

#include "board.h"
#include "human.h"
#include "ai.h"

//Main.
int main() {
	//Determines who will play first.
	int first_second;
	std::cout << "Do you want to be X (1) or O (-1) (X plays first and O plays second)? ";
	std::cin >> first_second;

	//Helper to determine whose turn it is. 
	int modulo_val = 0;
	if (first_second == 1) {
		modulo_val = 0;
	}
	else {
		modulo_val = 1;
	}

	//Initiates the board object
	Board game;
	std::cout << "Here is the board. A '-' indiates that the space is empty." << std::endl;
	std::cout << "When 'terminal' is displayed on the console, it means that the game "
		"has ended and there is either a victor or that the game is a draw." << std::endl;
	std::cout << "To make a move, simply type in the column number of the position you wish to move to (1-7)" << std::endl;
	game.print();
	std::cout << std::endl;
	Human human1(first_second, game);
	AI ai1(-first_second, game, human1);

	//Loops through the game and calls the AI class' make_move function for the computer to make a move.
	for (int i = 0; i < 43; ++i) {
		if (game.terminal() || i == 42) {
			std::cout << "Terminal" << std::endl;
			break;
		}

		if (i % 2 == modulo_val) {
			int human_position;
			std::cout << "Make your move, human: ";
			std::cin >> human_position;
			human1.play(human_position);
		}

		else {
			std::cout << "Please wait, the computer is thinking......" << std::endl;
			ai1.make_move(-first_second, &game);
		}
		std::cout << std::endl;
		game.print();
	}

	return 0;
}