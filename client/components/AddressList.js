import QRCode from 'qrcode.react';
export default class AddressList extends React.PureComponent {
	constructor(props) {
		super(props);
		this.setAddress = this.setAddress.bind(this);
		this.setIndex = this.setIndex.bind(this);
		this.state = {
			activeAddress: props.addresses[0],
			accountIndex: 0
		};
	}

	setAddress = async (accIndex) => {
		const { addresses } = this.props;
		this.setState({ activeAddress: addresses[accIndex] });
	}

	setIndex(event) {
		this.setState({ accountIndex: event.target.value });
		console.log(event.target.value);
	}

	render() {
		const { addresses } = this.props
		console.log(addresses);
		console.log(addresses.length);

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
			</div>
		);
	};
}
