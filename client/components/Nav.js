import Link from 'next/link';

const links = [
	{ href: 'https://github.com/lightswarm124', label: 'My GitHub' }
].map(link => {	// remap link.href + link.label into link.key
	link.key = `nav-link-${link.href}-${link.label}`
	return link;
});

const Nav = () => (
	<nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
		<div className="container">
			<a className="navbar-brand" href="/">OpenBounty</a>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav ml-auto">
				  	<li className="nav-item">
						<Link prefetch href="/">
					  		<a className="nav-link">Home</a>
						</Link>
						<Link prefetch href="/dapp">
							<a className="nav-link">Dapp</a>
						</Link>
<<<<<<< HEAD
						<Link prefetch href="/OBDapp">
							<a className="nav-link">OpenBounty App</a>
=======
						<Link prefetch href="/newdapp">
						  <a className="nav-link">newDapp</a>
>>>>>>> 789b72b3a85e6806d23c367654c7f16a5ce5c013
						</Link>
						<Link prefetch href="/dashboard">
							<a className="nav-link">Dashboard</a>
						</Link>
						<Link prefetch href="/OBDapp">
							<a className="nav-link">OBDapp</a>
						</Link>
				  	</li>
				  	<ul>
						{links.map( // remap links array into HTML format
					  		({ key, href, label }) => (
								<li className="nav-item" key={key}>
						  			<Link prefetch href={href}>
										<a className="nav-link">{label}</a>
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
