import Link from 'next/link';
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';
import Repo from './Repo';

class GitSearch extends React.Component {
    constructor(props) {
        super(props);
        this.onRepoClick = this.onRepoClick.bind(this);
        this.state = {
			repositories: []
		};
    }

    onRepoClick(event) {
        let search = this.GitSearch.value;
        let endpoint = 'https://api.github.com/search/repositories?q=' + search;

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
					<button onClick={this.onRepoClick}>Repo Search</button>
				</form>

				<b>{
					this.state.repositories ?
					this.state.repositories.map(repo => <Repo key={repo.id} {...repo} />)
					: <div></div>
				}</b>

			</div>
		);
	}
}

export default GitSearch;
