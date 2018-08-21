import Link from 'next/link';
import Web3Container from '../lib/Web3Container';
import Layout from './Layout';
import Repo from './Repo';

class GitData extends React.Component {
    constructor(props) {
        super(props);
		this.onUserClick = this.onUserClick.bind(this);
        this.state = {
			repositories: []
		};
    }

	onUserClick(event) {
		let search = this.GitSearch.value;
        let endpoint = 'https://api.github.com/search/repositories?q=user:' + search;

		// https://api.github.com/search/commits?q=author:lightswarm124  + searchTerm (URL for project author search)
		// https://api.github.com/search/repositories?sort=stars&order=desc&q= (default url)
		console.log(search);
		console.log(this.props);
		fetch(endpoint)
			.then(blob => blob.json())
			.then(response => {
				this.setState({
					repositories: response.items
				});
			});
		event.preventDefault();
	}

	render() {
		let repoInfo = this.state.repositories;
		return(
			<div>
				<form>
					<input type="text" className="reposearch"  ref={(input) => { this.GitSearch = input; }} />
					<button onClick={this.onUserClick}>User Search</button>
				</form>

				{ this.state.repositories.map(repo => <Repo key={repo.id} {...repo} />)}

			</div>
		);
	}
}

export default GitData;
