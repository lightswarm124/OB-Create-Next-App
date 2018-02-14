import Address from './Address';

export default class AddressList extends React.PureComponent {
	state = { activeAddress: undefined };

	setAddress = async () => {
		const { addresses } = this.props;
		this.setState({ activeAddress: addresses.accounts[0] });
	}

	render() {
		const { addresses } = this.props
		console.log(addresses.accounts)

		return(
			<div className="addressList">
				<div>Active Address: {this.state.activeAddress}</div>
				<button onClick={ this.setAddress.bind(this) }>Set Address</button>
				<br />
				<br />
				{ addresses.accounts.map((addressIter) => (
					<Address address={ addressIter } />
				))}
			</div>
		);
	};
}
