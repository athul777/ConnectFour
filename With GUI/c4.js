/*
Name: Athul Ganesh
UID: 604461749

Project Description: This is the Javascript version of the exact same thing in C++. I basically copied the code to allow the program to be easily run on a web browser.
You will notice that the functions all have the same names and values (and even things like the constructor, which are not even concepts in Javascript, have been carried over).
*/

//Defines a board class. 
var Board = function() {
    //Defines an array to represent the game board.
	this.board = [];
    
	//Defines the constant variables for the number of rows and columns on the board. 
    this.BOARD_ROWS = 6;
    this.BOARD_COLS = 7;
    
	//The 'constructor' basically initializes the board to have all 0 values provided that the index is in range, and 2 if not. Note, 1 represents X and -1 represents O (and 0 represents an empty square).
    this.constructor = function() {
        for (var i = 0; i < 72; ++i) {
            if (this.index_in_board(i)) this.board.push(0);
            else this.board.push(2);
        }   
    }
    
	//This function simply checks if a given 'index' is in the board. 
    this.index_in_board = function(index) {
        if ((index >= 0 && index <= 9) || (index >= 62 && index <= 71) ||
            index == 17 || index == 18 || index == 26 || index == 27 || index == 35 ||
            index == 36 || index == 44 || index == 45 || index == 53 || index == 54) {

            return false;
        }

        else {
            return true;
        }
    }
    
	//This function takes the board and simply displays its values to the respective box. 
    this.print = function() {
        var counter = 0;

        for (var i = 0; i < 72; ++i) {
            if (this.index_in_board(i)) {
                ++counter;
                if (this.board[i] === 0) {
                    //console.log("E");
                    $('#text' + i).html(" ");
                }
                else if (this.board[i] === 1) {
                    //console.log("X");
                    $('#text' + i).html("X");
                }
                else if (this.board[i] === -1) {
                    //console.log("O");
                    $('#text' + i).html("O");
                }
                //console.log("\t");
                //if (counter % 7 == 0) console.log("\n");
            }
        }
    }
    
	//This function checks if the current board state is either drawn or won. 
    this.terminal = function() {
        return (this.checkDraw() || this.checkWin());
    }
    
	//This function takes in a column number and checks if a move on that column can be made. 
    this.valid_move = function(column) {
        var index = column + 54;
        while (index >= 10) {
            if (this.board[index] === 0) {
                return true;
            }
            else index -= 9;
        }

        return false;
    }
    
	//This function checks if the current state of the board necessitates a win for either player. 
    this.checkWin = function() {
        return (this.horizontalCheck() || this.verticalCheck() || this.diagonalCheck());
    }
    
	//This function checks if all boxes are filled and the game is not won, and returns if the game is drawn. 
    this.checkDraw = function() {
        if (!this.checkWin()) {
            var counter = 0;

            for (var i = 0; i < 72; ++i) {
                if (this.index_in_board(i) && this.board[i] != 0) {
                    ++counter;
                }
            }

            if (counter == 42) return 1;

            else return 0;
        }

        return 0;
    }
    
	//This function checks if a connect four is still possible for the given four squares. 
    this.checkFour = function(a, b, c, d) {
        return (this.board[a] === this.board[b] && this.board[b] === this.board[c] && this.board[c] === this.board[d] && this.board[a] !== 0);
    }
    
	/*
		All of our 'checks' simply check for four in a rows along the specific direction. 
	*/
	
	//Checks the horizontal four in a rows and returns true if any are found. 
    this.horizontalCheck = function() {
        var position;
        var jump = 1;
        for (var r = 0; r < this.BOARD_ROWS; ++r) {
            for (var c = 0; c < this.BOARD_COLS - 3; ++c) {
                position = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.checkFour(position, position + jump, position + jump*2, position + jump*3)) {
                    return 1;
                }
            }
        }
        
        return 0;
    }
    
	//Checks the vertical four in a rows and returns true if any are found. 
    this.verticalCheck = function() {
        var position;
        var jump = 9;
        for (var r = 0; r < this.BOARD_ROWS - 3; ++r) {
            for (var c = 0; c < this.BOARD_COLS; ++c) {
                position = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.checkFour(position, position + jump, position + jump * 2, position + jump * 3)) {
                    return 1;
                }
            }
        }
        
        return 0;
    }
    
	//Checks the diagonal four in a rows and returns true if any are found. 
    this.diagonalCheck = function() {
        var position_right, position_left;
        var rightjump = 10;
        var leftjump = 8;
        
        for (var r = 0; r < this.BOARD_ROWS - 3; ++r) {
            for (var c = 0; c < this.BOARD_COLS - 3; ++c) {
                position_right = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.checkFour(position_right, position_right + rightjump, position_right + rightjump * 2, position_right + rightjump * 3)) {
                    return 1;
                }
            }
        }
        
        for (var r = 0; r < this.BOARD_ROWS - 3; ++r) {
            for (var c = 3; c < this.BOARD_COLS; ++c) {
                position_left = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.checkFour(position_left, position_left + leftjump, position_left + leftjump * 2, position_left + leftjump * 3)) {
                    return 1;
                }
            }
        }
        
        return 0;
    }
    
	//This function resets the board background colors. This is used when a new game is initiated. 
    this.reset = function() {
        this.board = [];
        this.constructor();
        for (var i = 0; i < 72; i++) {
            if (this.index_in_board(i)) {
                $('#square' + i).css("background-color", "#594B31");
            }
        }
        this.print();
    }
    
	//This function is called when the game is over and goes through the procedure of asking if the human wants to play another game. 
    this.terminal_procedure = function(human, computer) {
        console.log(human);
        console.log(computer);
        if (this.checkDraw() && !this.checkWin()) {
            $('#who-won').html("It's a draw.");
            setTimeout(function() {
                $('#play-again').modal({"backdrop": "static"});
                $('#play-again').modal('show');
            }, 1000);
            this.reset();
        }
        else if (this.checkWin()) {
            this.checkWinPrint();
            if (human.turn === false) {
                $('#who-won').html("You Win!");
            }
            else {
                $('#who-won').html("You Lose. The Computer Wins!");
            }
            
            setTimeout(function() {
                $('#play-again').modal({"backdrop": "static"});
                $('#play-again').modal('show');
            }, 2000);
        }
        else {
            if (computer.turn === true) {
                computer.make_move(computer.player, computer.game_ptr);
                human.turn = true;
                computer.turn = false;
            }
        }
    }
    
	//This function is called to initiate the move procedure. 
    this.move_procedure = function(human, computer) {
        human.turn = false;
        computer.turn = true;
        if (this.terminal()) {
            this.terminal_procedure(human, computer);
            return;
        }
        computer.make_move(computer.player, human.game_ptr);
        this.print();
        computer.turn = false;
        human.turn = true;
        if (this.terminal()) {
            this.terminal_procedure(human, computer);
        }
    }
    
	//This darkens the squares (when a four in a row is obtained). 
    this.checkWinPrint = function() {
        var position;
        var jump = 1;
        for (var r = 0; r < this.BOARD_ROWS; ++r) {
            for (var c = 0; c < this.BOARD_COLS - 3; ++c) {
                position = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.checkFour(position, position + jump, position + jump*2, position + jump*3)) {
                    var square1 = position;
                    var square2 = position + jump;
                    var square3 = position + jump*2;
                    var square4 = position + jump*3;
                    $('#square' + square1).css('background-color', 'black');
                    $('#square' + square2).css('background-color', 'black');
                    $('#square' + square3).css('background-color', 'black');
                    $('#square' + square4).css('background-color', 'black');
                    return;
                }
            }
        }
        
        //var position;
        jump = 9;
        for (var r = 0; r < this.BOARD_ROWS - 3; ++r) {
            for (var c = 0; c < this.BOARD_COLS; ++c) {
                position = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.checkFour(position, position + jump, position + jump * 2, position + jump * 3)) {
                    var square1 = position;
                    var square2 = position + jump;
                    var square3 = position + jump*2;
                    var square4 = position + jump*3;
                    $('#square' + square1).css('background-color', 'black');
                    $('#square' + square2).css('background-color', 'black');
                    $('#square' + square3).css('background-color', 'black');
                    $('#square' + square4).css('background-color', 'black');
                    return;
                }
            }
        }
        
        var position_right, position_left;
        var rightjump = 10;
        var leftjump = 8;
        
        for (var r = 0; r < this.BOARD_ROWS - 3; ++r) {
            for (var c = 0; c < this.BOARD_COLS - 3; ++c) {
                position_right = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.checkFour(position_right, position_right + rightjump, position_right + rightjump * 2, position_right + rightjump * 3)) {
                    var square1 = position_right;
                    var square2 = position_right + rightjump;
                    var square3 = position_right + rightjump*2;
                    var square4 = position_right + rightjump*3;
                    $('#square' + square1).css('background-color', 'black');
                    $('#square' + square2).css('background-color', 'black');
                    $('#square' + square3).css('background-color', 'black');
                    $('#square' + square4).css('background-color', 'black');
                    return;
                }
            }
        }
        
        for (var r = 0; r < this.BOARD_ROWS - 3; ++r) {
            for (var c = 3; c < this.BOARD_COLS; ++c) {
                position_left = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.checkFour(position_left, position_left + leftjump, position_left + leftjump * 2, position_left + leftjump * 3)) {
                    var square1 = position_left;
                    var square2 = position_left + leftjump;
                    var square3 = position_left + leftjump*2;
                    var square4 = position_left + leftjump*3;
                    $('#square' + square1).css('background-color', 'black');
                    $('#square' + square2).css('background-color', 'black');
                    $('#square' + square3).css('background-color', 'black');
                    $('#square' + square4).css('background-color', 'black');
                    return;
                }
            }
        }
    }
};

//Defines a human class. 
var Human = function(player_init, game_init) {
	
	/*
		Defines private variables:
		1. 'player': Defines which player goes first.
		2. 'game_ptr': Essentially keeps track of the board. 
		3. 'turn': Dictates whether the human can make a move. 
		4. 'BOARD_COLS': Defines number of columns.
		5. 'BOARD_ROWS': Defines number of rows. 
	*/
    this.player = player_init;
    this.game_ptr = game_init;
    this.turn = true;
    this.BOARD_ROWS = 6;
    this.BOARD_COLS = 7;
    
	//This function takes in a column input and places a human piece on the bottom of the column if possible. 
    this.play = function(column) {
        var index = column + 54;
        while (index >= 10) {
            if (this.game_ptr.board[index] === 0) {
                this.game_ptr.board[index] = this.player;
                break;
            }
            else index -= 9;
        }
    }
    
	//This function is a heuristic to calculate the number of possible connect fours in a given board position. This is to be used by the AI to find the best move. 
    this.evaluate = function(game_board) {
        var num_diagonal = this.possible_diagonal();
        var num_horizontal = this.possible_horizontal();
        var num_vertical = this.possible_vertical();
        return (3 * num_diagonal) + (2.5 * num_horizontal) + num_vertical;
    }
    
	//Given 4 adjacent boxes, checks if the player still has a possible connect four in those four positions. 
    this.possible_four = function(a, b, c, d) {
        if ((this.game_ptr.board[a] === 0 || this.game_ptr.board[a] === this.player) && (this.game_ptr.board[b] === 0 || this.game_ptr.board[b] === this.player)
        && (this.game_ptr.board[c] === 0 || this.game_ptr.board[c] === this.player) && (this.game_ptr.board[d] === 0 || this.game_ptr.board[d] === this.player)) {
            return true;
        }

        return false;
    }
    
	//Calculates the number of possible diagonals. 
    this.possible_diagonal = function() {
        var score = 0;
        var position_right, position_left;
        var rightjump = 10;
        var leftjump = 8;
        for (var r = 0; r < this.BOARD_ROWS - 3; ++r) {
            for (var c = 0; c < this.BOARD_COLS - 3; ++c) {
                position_right = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.possible_four(position_right, position_right + rightjump, position_right + rightjump*2, position_right + rightjump * 3)) {
                    score += 1;
                }
            }
        }

        for (var r = 0; r < this.BOARD_ROWS - 2; ++r) {
            for (var c = 2; c < this.BOARD_COLS; ++c) {
                position_left = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.possible_four(position_left, position_left + leftjump, position_left + leftjump*2, position_left + leftjump * 3)) {
                    score += 1;
                }
            }
        }

        return score;
    }
    
	//Calculates the number of possible horizontals. 
    this.possible_horizontal = function() {
        var score = 0;
        var position;
        var jump = 1;
        for (var r = 0; r < this.BOARD_ROWS; ++r) {
            for (var c = 0; c < this.BOARD_COLS - 2; ++c) {
                position = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.possible_four(position, position + jump, position + jump*2, position + jump * 3)) {
                    score += 1;
                }
            }
        }

        return score;
    }
    
	//Calculates the number of possible verticals.
    this.possible_vertical = function() {
        var score = 0;
        var position;
        var jump = 9;
        for (var r = 0; r < this.BOARD_ROWS - 2; ++r) {
            for (var c = 0; c < this.BOARD_COLS; ++c) {
                position = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.possible_four(position, position + jump, position + jump*2, position + jump * 3)) {
                    score += 1;
                }
            }
        }

        return score;
    }
};

//Defines an AI Class. 
var AI = function(player_init, game_init, human_init) {
	/*
		Defines private variables:
		1. 'player': Defines which player goes first.
		2. 'game_ptr': Essentially keeps track of the board.
		3. 'human_ptr': Object that lets AI keep track of human moves. 
		4. 'turn': Dictates whether the human can make a move. 
		5. 'BOARD_COLS': Defines number of columns.
		6. 'BOARD_ROWS': Defines number of rows. 
	*/
    this.player = player_init;
    this.game_ptr = game_init;
    this.human_ptr = human_init;
    this.turn = false;
    this.BOARD_ROWS = 6;
    this.BOARD_COLS = 7;
    
	//Changes the board state by making a move on given column with given player. 
    this.play = function(current_player, column) {
        var index = column + 54;
        while (index >= 10) {
            if (this.game_ptr.board[index] === 0) {
                this.game_ptr.board[index] = current_player;
                break;
            }
            else index -= 9;
        }
    }
    
	//Reverts a move already made on a column. 
    this.revert = function(current_player, column) {
        var index = column + 9;
        while (index <= 61) {
            if (this.game_ptr.board[index] === current_player) {
                this.game_ptr.board[index] = 0;
                break;
            }
            else index += 9;
        }
    }
    
	//Checks if a move is a valid move. 
    this.valid_move = function(column) {
        var index = column + 54;
        while (index >= 10) {
            if (this.game_ptr.board[index] === 0) {
                return true;
            }
            else index -= 9;
        }

        return false;
    }
    
	//Method that allows the computer to make a move. This is identical to the method used in C++. The method is clearly explained with the associated cpp file. 
    this.make_move = function(current_player, game_board) {
        var alpha = -2000;
        var beta = 2000;
        var depth = 0;
        var best_score;
        var position = 4;
        if (current_player === 1) {
            best_score = alpha;
            for (var i = 1; i < 8; ++i) {
                if (this.valid_move(i)) {
                    this.play(current_player, i);
                    var score = this.minimax(best_score, beta, -current_player, game_board, depth);
                    if (score > best_score) {
                        best_score = score;
                        position = i;
                    }
                    this.revert(current_player, i);
                    if (beta <= best_score) {
                        break;
                    }
                }
            }
        }

        else if (current_player == -1) {
            best_score = beta;
            for (var i = 1; i < 8; ++i) {
                if (this.valid_move(i)) {
                    this.play(current_player, i);
                    var score = this.minimax(alpha, best_score, -current_player, game_board, depth);
                    if (score < best_score) {
                        best_score = score;
                        position = i;
                    }
                    this.revert(current_player, i);
                    if (best_score <= alpha) {
                        break;
                    }
                }
            }
        }

        this.play(current_player, position);
    }
    
	//A basic implementation of the minimax algorithm (identical to C++) and explained in detail in the cpp file. 
    this.minimax = function(alpha, beta, current_player, game_board, depth) {
        if (game_board.checkWin()) return current_player * -1000;
        else if (game_board.checkDraw()) return 0;

        if (depth === 6) {
            if (this.player ===  -1) return this.evaluate(game_board);
            else if (this.player === 1) return -this.evaluate(game_board);
        }

        ++depth;
        var best_score;

        if (current_player === 1) {
            best_score = alpha;
            for (var i = 1; i < 8; ++i) {
                if (this.valid_move(i)) {
                    this.play(current_player, i);
                    var score = this.minimax(best_score, beta, -current_player, game_board, depth);
                    if (score > best_score) best_score = score;
                    this.revert(current_player, i);
                    if (beta <= best_score) {
                        break;
                    }
                }
            }
        }

        else if (current_player == -1) {
            best_score = beta;
            for (var i = 1; i < 8; ++i) {
                if (this.valid_move(i)) {
                    this.play(current_player, i);
                    var score = this.minimax(alpha, best_score, -current_player, game_board, depth);
                    if (score < best_score) best_score = score;
                    this.revert(current_player, i);
                    if (best_score <= alpha) {
                        break;
                    }
                }
            }
        }

        return best_score;
    }
    
	//Evaluates the computer's chances of winning the game based on a heuristic. 
    this.evaluate = function(game_board) {
        var num_diagonal = this.possible_diagonal();
        var num_horizontal = this.possible_horizontal();
        var num_vertical = this.possible_vertical();
        var human_evaluate = this.human_ptr.evaluate(game_board);
        return (human_evaluate - (3 * num_diagonal) - (2.5 * num_horizontal) - num_vertical);
    }
    
	//Checks if 4 adjacent boxes can potentially be a connect four. 
    this.possible_four = function(a, b, c, d) {
        if ((this.game_ptr.board[a] === 0 || this.game_ptr.board[a] === this.player) && (this.game_ptr.board[b] === 0 || this.game_ptr.board[b] === this.player)
        && (this.game_ptr.board[c] === 0 || this.game_ptr.board[c] === this.player) && (this.game_ptr.board[d] === 0 || this.game_ptr.board[d] === this.player)) {
            return true;
        }

        return false;
    }
    
	//Identical to human class. 
    this.possible_diagonal = function() {
        var score = 0;
        var position_right, position_left;
        var rightjump = 10;
        var leftjump = 8;
        for (var r = 0; r < this.BOARD_ROWS - 3; ++r) {
            for (var c = 0; c < this.BOARD_COLS - 3; ++c) {
                position_right = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.possible_four(position_right, position_right + rightjump, position_right + rightjump*2, position_right + rightjump * 3)) {
                    score += 1;
                }
            }
        }

        for (var r = 0; r < this.BOARD_ROWS - 2; ++r) {
            for (var c = 2; c < this.BOARD_COLS; ++c) {
                position_left = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.possible_four(position_left, position_left + leftjump, position_left + leftjump*2, position_left + leftjump * 3)) {
                    score += 1;
                }
            }
        }

        return score;
    }
    
	//Identical to human class. 
    this.possible_horizontal = function() {
        var score = 0;
        var position;
        var jump = 1;
        for (var r = 0; r < this.BOARD_ROWS; ++r) {
            for (var c = 0; c < this.BOARD_COLS - 2; ++c) {
                position = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.possible_four(position, position + jump, position + jump*2, position + jump * 3)) {
                    score += 1;
                }
            }
        }

        return score;
    }
    
	//Identical to human class. 
    this.possible_vertical = function() {
        var score = 0;
        var position;
        var jump = 9;
        for (var r = 0; r < this.BOARD_ROWS - 2; ++r) {
            for (var c = 0; c < this.BOARD_COLS; ++c) {
                position = ((this.BOARD_COLS + 2) * r) + c + 10;
                if (this.possible_four(position, position + jump, position + jump*2, position + jump * 3)) {
                    score += 1;
                }
            }
        }

        return score;
    }
};

//Necessary jQuery to enable the graphics to run smoothly. 
$(document).ready(function() {
    $("#choose-player").modal({"backdrop": "static"});
    $('#choose-player').modal('show');
    
    var c4_board = new Board();
    c4_board.constructor();
    
    var human_player;
    var computer_player;
    
    
    $('.x-button').click(function() {
        c4_board.reset();
        human_player = new Human(1, c4_board);
        computer_player = new AI(-1, c4_board, human_player);
        human_player.turn = true;
        computer_player.turn = false;
        console.log(human_player);
        console.log(computer_player);
    });
    
    $('.o-button').click(function() {
        c4_board.reset();
        human_player = new Human(-1, c4_board);
        computer_player = new AI(1, c4_board, human_player);
        human_player.turn = false;
        computer_player.turn = true;
        console.log(human_player);
        console.log(computer_player);
        computer_player.make_move(computer_player.player, c4_board);
        c4_board.print();
        human_player.turn = true;
        computer_player.turn = false;
    });
    
    $('.square-one').click(function() {
        if (human_player.turn === true && !c4_board.terminal() && c4_board.valid_move(1)) {
            human_player.play(1);
            c4_board.print();
            c4_board.move_procedure(human_player, computer_player);
        }
    });
    
    $('.square-two').click(function() {
        if (human_player.turn === true && !c4_board.terminal() && c4_board.valid_move(2)) {
            human_player.play(2);
            c4_board.print();
            c4_board.move_procedure(human_player, computer_player);
        }
    });
    
    $('.square-three').click(function() {
        if (human_player.turn === true && !c4_board.terminal() && c4_board.valid_move(3)) {
            human_player.play(3);
            c4_board.print();
            c4_board.move_procedure(human_player, computer_player);
        }
    });
    
    $('.square-four').click(function() {
        if (human_player.turn === true && !c4_board.terminal() && c4_board.valid_move(4)) {
            human_player.play(4);
            c4_board.print();
            c4_board.move_procedure(human_player, computer_player);
        }
    });
    
    $('.square-five').click(function() {
        if (human_player.turn === true && !c4_board.terminal() && c4_board.valid_move(5)) {
            human_player.play(5);
            c4_board.print();
            c4_board.move_procedure(human_player, computer_player);
        }
    });
    
    $('.square-six').click(function() {
        if (human_player.turn === true && !c4_board.terminal() && c4_board.valid_move(6)) {
            human_player.play(6);
            c4_board.print();
            c4_board.move_procedure(human_player, computer_player);
        }
    });
    
    $('.square-seven').click(function() {
        if (human_player.turn === true && !c4_board.terminal() && c4_board.valid_move(7)) {
            human_player.play(7);
            c4_board.print();
            c4_board.move_procedure(human_player, computer_player);
        }
    });
    
});