import React, { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  state = {
    manager: '',
    balance: '',
    value: '',
    message: '',
    numPlayers: '0',
    error: ''
  };

  async componentDidMount() {
    try{
      const manager = await lottery.methods.manager().call();
      const numPlayers = await lottery.methods.numPlayers().call();

      const balance = await web3.eth.getBalance(lottery.options.address);

      this.setState({ manager, balance, numPlayers });
    } catch (err){
      this.setState({ error: true })
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();

      this.setState({ message: 'Waiting for the transaction to complete...' })
  
      await lottery.methods.joinRaffle().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
  
      const numPlayers = await lottery.methods.numPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
  
      this.setState({ message: 'You have been entered!', numPlayers, balance, value: '' })
    } catch(error) {
      this.setState({ message: 'An error occurred. Please try again.' });
    }
    
  }

  onClick = async (event) => {
    try {
      const accounts = await web3.eth.getAccounts();

      this.setState({ message: 'Waiting for the transaction to choose a winner...' })

      await lottery.methods.selectWinnerRestricted().send({
        from: accounts[0],
      });

      const numPlayers = await lottery.methods.numPlayers().call();
      const winner = await lottery.methods.winner().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      this.setState({ message: `A winner has been chosen! The winner is address ${ winner } and the lottery was reset.`, numPlayers, balance, value: '' })
    } catch(error) {
      this.setState({ message: 'An error occurred. Please try again.' });
    }
    
  }

  clickToCopyManager(manager) {
    navigator.clipboard.writeText(manager);
  
    alert("Copied the text: " + manager);
  }

  render(){
    return (
      <div className="container">
        <header className="App-header">
          { this.state.error &&
          <div className='row'id='errorMessage'>
            <strong>
              The MetaMask browser extension was not detected. This application requires 
              <a href='https://www.google.com/search?q=metamask+extension' target='_blank' rel="noreferrer" > the MetaMask browser extension </a>
              to function properly.
            </strong>
          </div>
          }
          <img id="ethLogo" src="ethereum-logo-portrait-black-gray.png" alt="Ethereum Lottery Contract" />
          <div className='row'>
            <h2>Ethereum Lottery Contract</h2>
          </div>
          <div className='row'>
            <h3>Made With Solidity and React by <a href ='https://www.richardkronick.com/' target='_blank' rel="noreferrer" >Richard Kronick</a></h3>
          </div>
          <hr />
          <div className='row'>
            <h4>*Note that this is on the Ethereum Rinkeby test network ONLY - This is a demo for development purposes (not real ETH).</h4>
          </div>
        <p><a href='https://faucets.chain.link/rinkeby' target='_blank' rel="noreferrer" >Need some test ETH?</a></p>
        <p>
        <hr />
          This Ethereum lottery contract is managed by the following address: <span className='ethAddress'>{ this.state.manager }   </span>
          <button className="myBtn btn btn-sm" onClick={() => this.clickToCopyManager(this.state.manager)}>Click to Copy</button>
          <hr />
          Currently there are { this.state.numPlayers } participant(s) who have entered to win the lottery contract.
          <hr />
          The current prize value is { web3.utils.fromWei(this.state.balance, 'ether') } ETH.
          <hr />
          </p>
          <form onSubmit={ this.onSubmit }>
            <strong>Enter the ETH lottery and try your luck!</strong>
            <div>
              <label>Amount of ETH to enter:</label>
              <input value={ this.state.value } onChange={ event => this.setState({ value: event.target.value }) } />
              <button className="myBtn btn">Enter and Try Your Luck!</button>
            </div>
          </form>
          <div>
            <span id='message'><strong>{ this.state.message }</strong></span>
          </div>
          <hr />
          <p id="rules"><strong>Rules: (read before entering)</strong> You will receive one entry per 0.01 ETH (So, for example, 0.05 ETH will give you 5 total entries),
          up to 100 entries per transaction (1 ETH), regardless of how much you send.
          In other words, sending anything over 1 ETH, will result in 100 entries for you.
          Once there have been more than 200 entries, a winner will be chosen automatically at random.
          Or the manager can choose a winner at any time below.
          <hr />
          </p>
          <div>
            <strong>Are you the manager? If so you can pick a winner at any time.</strong>
          </div>
          <button type="button" className=" myBtn btn" onClick={ this.onClick }>Select a random winner!</button>
          </header>
      </div>
    );
  }
}

export default App;
