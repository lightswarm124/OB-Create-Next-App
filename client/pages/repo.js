import Layout from '../components/Layout';
import Link from 'next/link';

const PRInfo = ({...props}) => {
	let url = 'https://github.com/' + props.base.repo.owner.login + '/' + props.base.repo.name + '/pull/' + props.number;
	return (
		<div className="PullRequestInfo">
			<h4>PR Title: {props.title}</h4>
			<Link href={url}><a>PR_ID: {props.id}</a></Link>
			<p>Owner UserName: {props.user.login}</p>
			<p>Owner_ID: {props.user.id}</p>
			<p>PR_Number: {props.number}</p>
			<p>Created At: {props.created_at}</p>
			<p>Status: {props.state}</p>
		</div>
	)
}

class Repo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			repoData: [],
			loading: true,
		}
	}

	async fetchPR() {
		const res = await fetch(`https://api.github.com/repos/lightswarm124/OB-Create-Next-App/pulls`);
		const data = await res.json();
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
				{this.state.repoData.map(PR => <PRInfo key={PR.id} {...PR} />)}
			</Layout>
		);
	};
}

export default Repo;
