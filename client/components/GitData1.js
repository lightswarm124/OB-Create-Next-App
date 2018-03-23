class Shelf extends React.Component {
  componentDidMount () {
    this.intervals = [];
  }
  componentWillUnmount () {
    this.intervals.map(clearInterval);
  }
  setInterval () {
     this.intervals.push(setInterval.apply(null, arguments));
  }
  renderStats (user, repo) {
    return (
      <div className="c-shelf-repo__stats">
        {['watch', 'fork', 'follow', 'created_at',].map((type) => {
          let btnUrl = `https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=${type}&count=true`;
          return (
            <iframe height="20" allowtransparency="true" src={ btnUrl }/>
          )
        })}
      </div>
    )
  }
  changeRepo() {
    const $shelf = this.refs.myShelf;
    let $activeRepo = $shelf.querySelector('.c-shelf-repo--active');
    $activeRepo.className = 'c-shelf-repo c-shelf-repo--inactive';
    let $next = ($activeRepo.nextElementSibling) ? $activeRepo.nextElementSibling: $shelf.children[0];
    $next.className = 'c-shelf-repo c-shelf-repo--active';
  }
  renderData () {
    const { data } = this.props;
    return data.map((repo, idx) => {
      const className = (idx === 0) ? 'c-shelf-repo c-shelf-repo--active': 'c-shelf-repo';
      return (
      <div id="github-info">
        <li className={ className } key={ idx }>
					<div className="repo_details">
	          <h4 className="repo_name">{ repo.name }</h4>
  	        <p className="repo_description">{ repo.description }</p>
            <p className="repo_created_at"> { repo.created_at } </p>
					</div>
          { (repo.owner) ? this.renderStats(repo.owner.login, repo.name): null }
        </li>
      </div>
      )
    })
  }
  render () {
    if (this.props.data && this.props.data.length > 0) {
      if (this.intervals) this.intervals.map(clearInterval);
      this.setInterval(this.changeRepo.bind(this), this.props.interval);
      return (
        <ul className="c-shelf" ref="myShelf">
          { this.renderData() }
        </ul>
      )
    } else if (this.props.data) {
      return (
        <div>loading...</div>
      )
    } else {
      return (
        <span></span>
      )
    }
  }
}
class GitData extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      shelfSize: 50,
      shelfInterval: 6000
    };
  }
  updateUser () {
    const userInput = document.querySelector('.app-user-input');
    this.setState({
      user: userInput.value,
      repos: []
    });
    axios.get(`https://api.github.com/search/repositories?q=user:${userInput.value}&sort=stars&per_page=${this.state.shelfSize}`)
      .then((data) => {
        this.setState({
          repos: data.data.items,
          user: null
        });
      })
  }
  render () {
    return (
      <article id="repositories">
        <div className="repositories-container">
		  <input className="app-user-input" placeholder="github user handle" value={ this.state.user }/><br/>
		  <button className="app-user-change" onClick={this.updateUser.bind(this)}>Update user</button>
          <Shelf
            data={(this.state.repos) ? this.state.repos: null}
            interval={ this.state.shelfInterval }
           ></Shelf>
        </div>
     </article>
    )
  }
}

export default GitData;


<style jsx>{`
  .repositories-container {
    display: -webkit-flex;display: -moz-flex;display: -ms-flex;display: -o-flex;display: flex;
    max-width: 1000px;
    width: 80%;
    margin: 0 auto;
    padding: 70px 0;
  }
  .github-info {
    float: right;
  }
  .repositories {
    display: -webkit-flex;display: -moz-flex;display: -ms-flex;display: -o-flex;display: flex;
    justify-content: space-between;
    -ms-align-items: right;align-items: right;
    -webkit-flex-wrap: wrap;-moz-flex-wrap: wrap;-ms-flex-wrap: wrap;-o-flex-wrap: wrap;flex-wrap: wrap;
    max-width: 1000px;
    width: 80%;
    margin: 0 auto;
    padding: 70px 0;
  }
  .repo_details {
    position: right
    margin: 2%;
    height: 50px;
    box-shadow: inset 0 0 0 3px #2c3e50;
    transition: all 0.4s 0.1s;
    padding: 5%;
    width: 200px;
    font-family: Raleway;
    font-size: 12px;
    box-shadow: 0px 0px 0 #000;
    background-color: #2f4f4f;
  }
  .repo:hover {
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
    box-shadow: 5px 5px 0 #067df7;
  }
  .repo h4 {
    margin-left: 5px;
    font-size: 14px;
    width: 100%;
    border-bottom: 1px solid #fff;
    padding: 10px 0;
  }
  .repo a {
    z-index: 100;
    bottom: 10px;
    left: 0;
    right: 0;
    display: -webkit-flex;display: -moz-flex;display: -ms-flex;display: -o-flex;display: flex
    justify-content: right;
    color: #ccc;
    font-size: 11px;
    text-decoration: none;
    margin: 0 auto;
  }
  .repo:hover a {
    color: #067df7;
    text-decoration: underline;
  }
  .repo a img {
    display: block;
    margin-bottom: 5px;
  }
  .repo svg {
    position: absolute;
    top: 0;
    left: 0;
    // right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
  svg line {
    stroke-width: 2;
    stroke: #fff;
    fill: none;
    stroke-dasharray: 300;
    -webkit-transition: all 1s;
    transition: transform 1s;
  }
  .repo:hover svg line.top {
    -webkit-transform: translateX(-600px);
    transform: translateX(-600px);
  }
  .repo:hover svg line.bottom {
    -webkit-transform: translateX(600px);
    transform: translateX(600px);
  }
  .repo svg line.left,
  .repo svg line.right {
    stroke-dasharray: 175px;
  }
  .repo:hover svg line.left {
    -webkit-transform: translateY(350px);
    transform: translateY(350px);
  }
  .repo:hover svg line.right {
    -webkit-transform: translateY(-350px);
    transform: translateY(-350px);
  }
  @media screen and (max-width: 736px) {
    #devRepositories {
      justify-content: space-around;
      padding: 30px 0;
    }
    .repo { margin: 20px; border: 1px solid #fff; }
    .repo svg { display: none; }
  }
`}</style>
