import Link from 'next/link';

const Repo = ({...props}) => {
	return (
		<div className="repo">
			<Link href={{ pathname: '/repo', query: { key: props.id, user: props.owner.login, name:props.name } }}>
				<a>Repo Name: {props.name}</a>
			</Link><br />
			<Link href={`https://github.com/${props.owner.login}/${props.name}`}>
				<a>Repo ID: {props.id}</a>
			</Link><br />
			<a>Repo Description: {props.description}</a><br />
			<Link href={`https://github.com/${props.owner.login}`}>
				<a>Repo Owner: {props.owner.login}</a>
			</Link><br />
			<a>Owner_ID: {props.owner.id}</a><br />
			<a>Created At: {props.created_at}</a><br /><br />
		</div>
	)
}

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
		return(
			<div>
				<form>
					<input type="text" className="reposearch"  ref={(input) => { this.GitSearch = input; }} />
					<button onClick={this.onRepoClick}>Repo Search</button>
				</form>

				{ this.state.repositories.map(repo => <Repo key={repo.id} {...repo} />)}
			</div>
		);
	}
}

export default GitSearch;
