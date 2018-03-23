import Link from 'next/link';
import Layout from '../components/Layout';
import Web3Container from '../lib/Web3Container';
import GitSearch from '../components/GitSearch';
import GitData from '../components/GitData';

class Repos extends React.Component {
	render() {
		return(
            <Layout>
				<h2>Search Repositories</h2>
                <GitSearch />
				<h2>Search Users</h2>
                <GitData />
        	</Layout>
    	);
	};
}

export default () => (
  	<Web3Container
    	renderLoading={() => <Layout>Loading..</Layout>}
    	render={({ web3, accounts, TokenRegistry, OBContract }) => (
      		<Repos web3={web3} accounts={accounts} TokenRegistry={TokenRegistry} OBContract={OBContract} />
    	)}
  	/>
)
