import Link from 'next/link';
import Layout from '../components/Layout';

export default () => (
  <Layout title="Home" description="Create-Next-App">

    <div className="hero">
      <h1 className="title">Welcome to OpenBounty v.0.30a</h1>
      <p className="description">OpenBounty is a Decentralized Network that connects people-to-projects and projects-to-people.</p>
      <div className="row">
        <Link href="/OBDapp">
          <a className="card">
            <h3>Whitepaper &rarr;</h3>
            <p>Learn more about Ethereum Accounts in their example</p>
          </a>
        </Link>
		<Link href="/dapp">
		  <a className="card">
			<h3>Documentation &rarr;</h3>
			<p>Learn how to install OpenBounty-Server.  Learn how to use the OpenBounty platform.</p>
		  </a>
		</Link>
        <Link href="/dashboard">
          <a className="card">
            <h3>Tutorials &rarr;</h3>
            <p>Check out OpenBounty Video Tutorials</p>
          </a>
        </Link>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title, .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9B9B9B;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </Layout>
);
