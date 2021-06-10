import React from "react";
import "../styles/CustomGameMode.css";

class CustomGameMode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: 5,
      cols: 5,
      bombs: 5,
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();

    let boardSize = {
      rows: this.state.rows,
      cols: this.state.cols,
      bombs: this.state.bombs,
    };

    this.props.restartGame(boardSize);
  };

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    this.setState({ [nam]: val });
  };

  render() {
    return (
      <div className="container-game-mode">
        <div className="game-mode-display" style={{ boxShadow: this.props.colorBoard }}>
          <button
            className="btn-game-mode"
            onClick={() =>
              this.props.restartGame({ rows: 13, cols: 20, bombs: 15 })
            }
          >
            Fácil
          </button>
        </div>
        <div
          className="game-mode-display"
          style={{ boxShadow: this.props.colorBoard }}
        >
          <button
            className="btn-game-mode"
            onClick={() =>
              this.props.restartGame({ rows: 12, cols: 20, bombs: 25 })
            }
          >
            Normal
          </button>
        </div>
        <div
          className="game-mode-display"
          style={{ boxShadow: this.props.colorBoard }}
        >
          <button
            className="btn-game-mode"
            onClick={() =>
              this.props.restartGame({ rows: 10, cols: 16, bombs: 35 })
            }
          >
            Experto
          </button>
        </div>
        <form className="game-mode-form" onSubmit={this.mySubmitHandler}>
          <div className="input-form-container">
            <input
              type="number"
              name="rows"
              placeholder="Filas"
              onChange={this.myChangeHandler}
            />
            <input
              type="number"
              name="cols"
              placeholder="Columnas"
              onChange={this.myChangeHandler}
            />
            <input
              type="number"
              name="bombs"
              placeholder="Minas"
              onChange={this.myChangeHandler}
            />
          </div>
          <input
            className="btn-submit"
            type="submit"
            value="Crear partida personalizada"
          />
        </form>
      </div>
    );
  }
}

export default CustomGameMode;
