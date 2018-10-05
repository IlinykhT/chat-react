class App extends React.Component {
	constructor() {
		super();
		if (!localStorage.getItem("chat")) {
			localStorage.setItem("chat",JSON.stringify([]));
		}	
		this.state = {
			message: JSON.parse(localStorage.getItem("chat"))
		};
        this.sendMessage = this.sendMessage.bind(this);
	}
    
	sendMessage(oneMess) {
		let messArray = this.state.message;
		let obj = {nick: oneMess.nick, mess: oneMess.mess};
		messArray.push(obj);
		this.setState(messArray);
		localStorage.setItem("chat", JSON.stringify(this.state.message));
		
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
	componentDidMount() {
		this.messagesEnd.scrollIntoView();
	}
	
	componentDidUpdate() {
		this.messagesEnd.scrollIntoView();
	}	
	
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
				<div ref= {(div) => { this.messagesEnd = div; }}></div>
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
			mess: "",
			submitDisabled: true
        }
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeNick = this.handleChangeNick.bind(this);
		this.handleChangeMess = this.handleChangeMess.bind(this);
	}

    handleSubmit(e) {
		e.preventDefault();
        this.props.sendMessage(this.state);
        this.setState({
            mess: "",
			submitDisabled: true
        });
    }
	
	handleChangeNick(e) { 
		let disabled = e.target.value && this.state.mess ? false : true;
		this.setState({
			nick: e.target.value,
			submitDisabled: disabled
		});
    }
	
	handleChangeMess(e) {
		let disabled = this.state.nick && e.target.value ? false : true;		
		this.setState({
			mess: e.target.value,
			submitDisabled: disabled
		});
    }
	  
    render() {
        return (
			<div className="sending">
				<form onSubmit={this.handleSubmit}>
					<div className="input-block">
						<label>Nickname</label>
						<input 
							type="text" 
							value={this.state.nick} 
							onChange={this.handleChangeNick} 
							autoComplete="off" 
							className="nickInput" /> 
						<br/><br/>
						<label>Message</label>
						<input 
							type="text" 
							value={this.state.mess} 
							onChange={this.handleChangeMess} 
							autoComplete="off" /> 
					</div>
					<div className="input-block">
						<input 
							type="submit" 
							className="send-button" 
							value="Send" 
							disabled={this.state.submitDisabled} />
					</div>
				</form>	
			</div>	
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
