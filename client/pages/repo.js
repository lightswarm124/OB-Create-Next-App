import Layout from '../components/Layout';
import Web3Container from '../lib/Web3Container';
import Link from 'next/link';

const PRInfo = ({...props}) => {
	let url = 'https://github.com/' + props.base.repo.owner.login + '/' + props.base.repo.name + '/pull/' + props.number;
	return (
		<div className="PullRequestInfo">
			<a>PR Title: {props.title}</a><br />
			<Link href={url}><a>PR ID: {props.id}</a></Link><br />
			<Link href={`https://github.com/${props.user.login}`}>
				<a>PR User: {props.user.login}</a>
			</Link><br />
			<a>PR User ID: {props.user.id}</a><br />
			<a>PR Number: {props.number}</a><br />
			<a>Created At: {props.created_at}</a><br />
			<a>Status: {props.state}</a><br /><br/>
		</div>
	)
}

class Repo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			repoData: []
		}
	}

	async fetchPR() {
		console.log(this.props)
		const res = await fetch(`https://api.github.com/repos/${this.props.url.query.user}/${this.props.url.query.name}/pulls?state=all`);
		const data = await res.json();
		return this.setState({
			repoData: data,
		})
	}

	componentDidMount() {
		return this.fetchPR();
	}

	render() {
		return(
			<Layout>
				<h2>{`${this.props.url.query.name} `}Pull Requests</h2>
				{this.state.repoData.map(PR => <PRInfo key={PR.id} {...PR} />)}
			</Layout>
		);
	};
}

export default Repo;
