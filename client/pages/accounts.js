import Layout from '../components/Layout';
import Web3Container from '../lib/Web3Container';
import AddressList from '../components/AddressList';

class Accounts extends React.Component {
	render() {
		const accounts = this.props;

		return(
			<Layout title="Accounts" description="Ethereum Accounts">

				<div className="hero">
					<h1 className="title">My Accounts</h1>
					<ul className="list-group">
					</ul>

					<AddressList addresses={accounts} />
				</div>
			</Layout>
		);
	};
}

export default () => (
	<Web3Container
		renderLoading={() => <Layout>Loading Accounts Page...</Layout>}
		render={({ accounts }) => <Accounts accounts={accounts} />}
	/>
);
