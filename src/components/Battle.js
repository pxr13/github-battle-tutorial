import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class PlayerInput extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState(() => {
      return {
        username: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
     return (
       <form className='PlayerInput__column' onSubmit={this.handleSubmit}>
         <label className='PlayerInput__header' htmlFor='username'>{this.props.label}</label>
         <input
           id='username'
           placeholder='github username'
           type='text'
           value={this.state.username}
           autoComplete='off'
           onChange={this.handleChange}
         />
         <button
           className='button'
           type='submit'
           disabled={!this.state.username}
         >
           Submit
         </button>
       </form>
     )
   }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSumbit: PropTypes.string.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(() => {
      let newState = {};
      newState[`${id}Name`] = username;
      newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  }

  render() {
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;

    return (
      <div className="Battle__row">
        {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
          />
        }
        {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit}
          />
        }
      </div>
    )
  }
}

export default Battle;