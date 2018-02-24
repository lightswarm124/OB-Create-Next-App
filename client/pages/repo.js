import Layout from '../components/Layout';

const PRInfo = ({...props}) => {
	return (
		<div className="PullRequestInfo">
			<h4>Repo Name: {props.name}</h4>
			<h4>Repo_ID: {props.id}</h4>
			<p>Repo Description: {props.description}</p>
			<p>Owner UserName: {props.owner.login}</p>
			<p>Owner_ID: {props.owner.id}</p>
			<p>Created At: {props.created_at}</p>
		</div>
	)
}

class Repo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			repoData: undefined,
			loading: true,
		}
	}

	async fetchPR() {
		const res = await fetch(`https://api.github.com/repos/lightswarm124/OB-Create-Next-App/pull`);
		const data = await res.json().then(console.log(data));
		return this.setState({
			repoData: data,
			loading: false,
		})
	}

	componentDidMount() {
		return this.fetchPR();
	}

	render() {
		return(
			<Layout>
				<h1>{this.state.repoData.id}</h1>
			</Layout>
		);
	};
}

export default Repo;
