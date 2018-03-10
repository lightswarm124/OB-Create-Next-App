let searchTerm;

class GitSearch extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { repositories: [] };
    }


    render() {
        return(
            <div>
                <div className="foundRepo">{this.props.user}</div>
                <ul>
                { this.state.repositories.map( ( item, index ) => (
                    <li key={ index }>
                        { item.user }
                        { item.url  }
                    </li>
                )) }
                </ul>
                <form>
                <input type="text" className="gitsearch"  ref={(input) => { this.GitSearch = input; }}/>
                <button onClick={this.onClick}>Search</button>
                </form>
            </div>
            );
    }

    onClick(event) {

        searchTerm = this.GitSearch.value;

        let endpoint = 'https://api.github.com/search/repositories?q=' + searchTerm;

        // https://api.github.com/search/commits?q=author:lightswarm124  + searchTerm (URL for project author search)
        // https://api.github.com/search/repositories?sort=stars&order=desc&q= (default url)
        console.log(searchTerm);
        fetch(endpoint)
            .then(blob => blob.json())
            .then(response => {
                this.setState({ repositories: response.items });
            });
        event.preventDefault();

    }
}

<<<<<<< HEAD
=======

>>>>>>> 3fa8c208dfcc5146cbfa0ad1f87bcb276265b20b
export default GitSearch;
