import QRCode from 'qrcode.react';
export default class AddressList extends React.PureComponent {
	constructor(props) {
		super(props);
		this.setAddress = this.setAddress.bind(this);
		this.setIndex = this.setIndex.bind(this);
		this.state = {
			activeAddress: props.addresses[0],
			accountIndex: 0,
			ethBalance: 0
		};
	}

	setAddress = async (accIndex) => {
		const { addresses, web3 } = this.props;
		let ethBal = web3.eth.getBalance(addresses[accIndex]);

		this.setState({ activeAddress: addresses[accIndex], ethBalance: ethBal });
	}

	setIndex(event) {
		this.setState({ accountIndex: event.target.value });
		console.log(event.target.value);
	}

	render() {
		const { addresses, web3 } = this.props
		return(
			<div className="addressList">
  			<center><QRCode value={this.state.activeAddress} /></center>
				<div><center><b>Active Address</b></center>
				{this.state.activeAddress}</div>
				<button onClick={ () => this.setAddress(this.state.accountIndex).bind(this) }>Set Address</button>
				<br />
				<br />
				<p>Available Address Accounts</p>
				<select onChange={this.setIndex}>
					{ addresses.map((address, i) => (
						<option key={i} value={i}>{i}: {address}</option>
					))}
				</select>
				<center>{this.state.ethBalance}</center>
			</div>
		);
	};
}
