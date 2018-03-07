import Link from 'next/link';
import ActiveLink from './ActiveLink';

const links = [
	{ href: 'https://github.com/lightswarm124', label: 'Login w/ Github' }
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
						<ActiveLink prefetch href="/testOB">
							<a className="nav-link">Test Contract</a>
						</ActiveLink>
				  	</li>
				  	<ul>
						{links.map( // remap links array into HTML format
					  		({ key, href, label }) => (
								<li className="nav-item" key={key}>
						  			<ActiveLink href={href}>
										{label}
						  			</ActiveLink>
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
