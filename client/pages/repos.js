import Layout from '../components/Layout';
import Link from 'next/link';

const Repo = ({...props}) => {
	return (
		<div className="repo">
			<Link href={{ pathname: '/repo', query: { key: props.id } }}>
				<a>Repo Name: {props.name}</a>
			</Link>
			<br />
			<Link href='https://github.com/lightswarm124/OB-Create-Next-App/pulls'><a>Repo_ID: {props.id}</a></Link>
			<p>Repo Description: {props.description}</p>
			<p>Owner UserName: {props.owner.login}</p>
			<p>Owner_ID: {props.owner.id}</p>
			<p>Created At: {props.created_at}</p>
		</div>
	)
}

class Repos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			repos: [],
			currentRepo: undefined,
			userName: undefined,
			loading: true,
		}
	}

	async fetchRepos() {
		const res = await fetch(`https://api.github.com/users/lightswarm124/repos`);
		const data = await res.json();
		return this.setState({
			repos: data,
			loading: false,
		})
	}

	componentDidMount() {
		return this.fetchRepos();
	}

	render() {
		return(
			<Layout>
				{this.state.repos.map(repo => <Repo key={repo.id} {...repo} />)}
			</Layout>
		);
	};
}

export default Repos;
