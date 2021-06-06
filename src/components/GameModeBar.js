import React from "react";
import "../styles/GameModeBar.css";

class GameModeBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rows: 12,
      cols: 20,
      mines:25,
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();

    this.props.restartGame(this.state.rows, this.state.cols, this.state.mines);
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {
    return (
      <form className="game-mode-form" onSubmit={this.mySubmitHandler}>
        <h2>Partida personalizada:</h2>
      <input
        type='number'
        name='rows'
        placeholder='Filas'
        onChange={this.myChangeHandler}
      />
      <input
        type='number'
        name='cols'
        placeholder='Columnas'
        onChange={this.myChangeHandler}
      />
      <input
        type='number'
        name='mines'
        placeholder='Minas'
        onChange={this.myChangeHandler}
      />
      <input
        type='submit'
        value='Aceptar'
      />
      </form>
    );
  }
}

export default GameModeBar;