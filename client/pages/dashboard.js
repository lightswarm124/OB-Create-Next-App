import Layout from '../components/Layout';
import Web3Container from '../lib/Web3Container';
import AddressList from '../components/AddressList';


class Dashboard extends React.Component {
	render() {
		const accounts = this.props;


		return (
			<Layout title="Dashboard" description="OpenBounty Dashboard" >

				<div className="row">
					<a className="card">
						<AddressList addresses={accounts} />
					</a>
				</div>

				<style jsx>{`
					.row {
					  max-width: 1000px;
					  margin: 80px auto 40px;
					  display: flex;
					  flex-direction: row;
					  justify-content: space-around;
					}
					.card {
					  padding: 18px 18px 24px;
					  width: 500px;
					  text-align: left;
					  text-decoration: none;
					  color: #434343;
					  border: 5px solid #9B9B9B;
					}
					.card:hover {
					  border-color: #FFA500;
					}
					.card h3 {
					  margin: 3;
					  color: #067df7;
					  font-size: 20px;
					}
					.card p {
					  margin: 0;
					  padding: 12px 0 0;
					  font-size: 13px;
					  color: #333;
					}
				`}</style>
			</Layout>
		);
	};
}

export default () => (
	<Web3Container
		renderLoading={() => <Layout>Loading Accounts Page...</Layout>}
		render={({ accounts }) => <Dashboard accounts={accounts} />}
	/>
);
