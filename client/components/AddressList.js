export default class AddressList extends React.PureComponent {
	constructor(props) {
		super(props);
		this.setAddress = this.setAddress.bind(this);
		this.setIndex = this.setIndex.bind(this);
		this.state = {
			activeAddress: props.addresses.accounts[0],
			accountIndex: 0
		};
	}

	setAddress = async (accIndex) => {
		const { addresses } = this.props;
		this.setState({ activeAddress: addresses.accounts[accIndex] });
	}

	setIndex(event) {
		this.setState({ accountIndex: event.target.value });
		console.log(event.target.value);
	}

	render() {
		const { addresses } = this.props
		console.log(addresses);
		console.log(addresses.accounts);
		console.log(addresses.accounts.length);

		return(
			<div className="addressList">
				<div>Active Address: {this.state.activeAddress}</div>
				<button onClick={ () => this.setAddress(this.state.accountIndex) }>Set Address</button>
				<br />
				<br />
				<select onChange={this.setIndex}>
					{ addresses.accounts.map((address, i) => (
						<option key={i} value={i}>{i}: {address}</option>
					))}
				</select>
			</div>
		);
	};
}
