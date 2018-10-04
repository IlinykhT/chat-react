class App extends React.Component {
	constructor() {
		super();
		if (!localStorage.getItem("chat")) {
			localStorage.setItem("chat",JSON.stringify([]));
		}	
		const chatHistory = JSON.parse(localStorage.getItem("chat"));

		this.state = {
		   message: chatHistory
		};
        this.sendMessage = this.sendMessage.bind(this);
	}
    
	sendMessage(oneMess) {
		let messArray = this.state.message;
		messArray.push(oneMess);
		this.setState(messArray);
		localStorage.setItem("chat",JSON.stringify(this.state.message));
    }	

	render() {
		return (
			<div className = "container">
				<Title />
				<MessageList data = {this.state.message}/>
				<SendMessageForm sendMessage = {this.sendMessage} />
			</div>
		);
	}
}

class MessageList extends React.Component {
  render() {
    return (
		<div className = "chatarea">
			{this.props.data.map((message, index) => {
				return (
					<div key = {index}>
					   <strong>{message.nick}: </strong>{message.mess}
					</div> 
				)})
			}	
		</div>
    )
  }
}

function Title() {
  return <div className="head">Enjoy chatting!</div>
}

class SendMessageForm extends React.Component {
    constructor() {
        super();
        this.state = {
			nick: "",
            mess: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeNick = this.handleChangeNick.bind(this);
		this.handleChangeMess = this.handleChangeMess.bind(this);
    }
    
    handleSubmit(e) {
		e.preventDefault();
        this.props.sendMessage(this.state);
        this.setState({
            mess: ""
        })
    }
	
	handleChangeNick(e) {
        this.setState({
            nick: e.target.value
        })
    }
	
	handleChangeMess(e) {
        this.setState({
            mess: e.target.value
        })
    }
    
    render() {
        return (
			<div className="sending">
				<form onSubmit={this.handleSubmit}>
					<div className="input-block">
						<label>Nickname</label>
						<input id="nickInput" type="text" value={this.state.nick} onChange={this.handleChangeNick} /> 
						<br/><br/>
						<label>Message</label>
						<input id="messageInput" type="text" value={this.state.mess} onChange={this.handleChangeMess} /> 
					</div>
					<div className="input-block">
						<input type="submit" className="send-button" value="Send"/>
					</div>
				</form>	
			</div>	
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));