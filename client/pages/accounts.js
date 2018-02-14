import Link from 'next/link';
import Head from '../components/Head';
import Nav from '../components/Nav';
import Web3Container from '../lib/Web3Container';
import AddressList from '../components/AddressList';

class Accounts extends React.Component {
/*
	AccountsList = async () => {
		const { accounts } = this.props;
		JSON.parse(accounts, null, 4)
		.map(( account, index ) => {
			account.key = index;
			account.address = account;
			return account;
		});
	};
*/
	render() {
		const accounts = this.props;

		return(
			<div>
				<Head title="Accounts" description="Ethereum Accounts"/>
				<Nav />

				<div className="hero">
					<h1 className="title">My Accounts</h1>
					<ul className="list-group">
					</ul>

					<AddressList addresses={accounts} />

					<div><Link href='/'><a>Home</a></Link></div>
				</div>
			</div>
		);
	};
}

export default () => (
	<Web3Container
		renderLoading={() => <div>Loading Accounts Page...</div>}
		render={({ accounts }) => <Accounts accounts={accounts} />}
	/>
);
