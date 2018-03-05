import Link from 'next/link';
import ActiveLink from './ActiveLink';


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
<<<<<<< HEAD

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
=======
						<ActiveLink className="nav-link" href="/">
					  		Home
						</ActiveLink>
						<ActiveLink className="nav-link" href="/account">
							Account
						</ActiveLink>
						<ActiveLink className="nav-link" href="/repos">
							Repos
						</ActiveLink>
						<ActiveLink className="nav-link" href="/project">
						  Project
						</ActiveLink>
						<ActiveLink className="nav-link" href="/dashboard">
							Dashboard
						</ActiveLink>
>>>>>>> 2aaf9f91d81516616f67e43fb11244a65b4a653b
				  	</li>
				  	<ul>
						{links.map( // remap links array into HTML format
					  		({ key, href, label }) => (
								<li className="nav-item" key={key}>
<<<<<<< HEAD
						  			<Link prefetch href={href}>
										<a className="nav-link"><b>{label}</b></a>
						  			</Link>
=======
						  			<ActiveLink href={href}>
										{label}
						  			</ActiveLink>
>>>>>>> 2aaf9f91d81516616f67e43fb11244a65b4a653b
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
			ActiveLink {
				color: #067df7;
				text-decoration: none;
				font-size: 13px;
			}
		`}</style>
	</nav>
);

export default Nav;
