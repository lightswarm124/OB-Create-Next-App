export default class Address extends React.Component {
	render() {
		const { address } = this.props;
		console.log(address);

		return(
			<div className="main">
				<a className="EthAddress">{ address }</a>
			</div>
		);
	}
}
