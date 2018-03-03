import Link from 'next/link';


const links = [
	{ href: 'https://github.com/lightswarm124', label: <img src="../static/GitHub-Mark-120px-plus.png" width="30px" title="Login with GitHub" /> }
].map(link => {	// remap link.href + link.label into link.key
	link.key = `nav-link-${link.href}-${link.label}`
	return link;
});

const Nav = () => (
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
		<div className="container">
			<a className="navbar-brand" href="/"><img src="../static/Logo_Black.png" title="Home" width="180px" /></a>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav ml-auto">
				  	<li className="nav-item">

						<Link prefetch href="/account">
							<a className="nav-link"><img src="../static/Account.png" width="30px" title="Account Management" /></a>
						</Link>
						<Link prefetch href="/repositories">
							<a className="nav-link"><img src="../static/Repositories.png" width="30px" title="Repository Management" /></a>
						</Link>
						<Link prefetch href="/project">
						  <a className="nav-link"><img src="../static/Project.png" width="30px" title="Project Management" /></a>
						</Link>
						<Link prefetch href="/settings">
							<a className="nav-link"><img src="../static/Settings.png" width="30px" title="OpenBounty Settings" /></a>
						</Link>
				  	</li>
				  	<ul>
						{links.map( // remap links array into HTML format
					  		({ key, href, label }) => (
								<li className="nav-item" key={key}>
						  			<Link prefetch href={href}>
										<a className="nav-link"><b>{label}</b></a>
						  			</Link>
								</li>
					  		)
						)}
				  	</ul>
				</ul>
			</div>
		</div>

		<style jsx>{`
			:global(body) {
				margin: 0;
				font-family: -apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Helvetica,sans-serif;
			}
			nav {
				text-align: center;
			}
			ul {
				display: flex;
				justify-content: space-between;
			}
			nav > ul {
				padding: 4px 16px;
			}
			li {
				display: flex;
				padding: 6px 8px;
			}
			a {
				color: #067df7;
				text-decoration: none;
				font-size: 13px;
			}
		`}</style>
	</nav>
);

export default Nav;
