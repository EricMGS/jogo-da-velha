import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';

function Square(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.square}>
        <Text style={{color: 'dodgerblue', fontSize: 20}}>
          {props.value}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squaresCopy = this.state.squares.slice();
    if (this.calculateWinner() || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squaresCopy, 
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return(
      <Square 
        value={this.state.squares[i]}
        onPress={() => this.handleClick(i)}
      />
    );
  }

  getInitialState() {
    return {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  reiniciar() {
    this.setState(this.getInitialState());
  }

  calculateWinner() {
    const squares = this.state.squares;
    const linhas = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for(let i = 0; i < linhas.length; i++) {
      const [a, b, c] = linhas[i];
      if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    let status = '';
    const winner = this.calculateWinner();
    if(winner) {
      status = `Vencedor: ${winner}`
    } else if(this.state.squares.every((x) => x)) {
      status = "Empate";
    } else {
      status = `Próximo jogador: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <View>
        <View style={styles.board}>
          <View style={{flexDirection: 'row'}}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </View>
          <View style={{flexDirection: 'row'}}>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </View>
          <View style={{flexDirection: 'row'}}>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </View>
          <Text style={{marginTop: 15}}>{status}</Text>
        </View>
        <Button
        title="Reiniciar"
        onPress={() => this.reiniciar()}
      ></Button>
    </View>
    );
  }
}

class JogoDaVelha extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>JOGO DA VELHA</Text>
        <Board />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	board: {
		alignItems: 'center',
	},
	square: {
		width: 60,
		height: 60,
		backgroundColor: 'lightgray',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 1
	}
});

export default JogoDaVelha;