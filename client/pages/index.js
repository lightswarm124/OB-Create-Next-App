import Link from 'next/link';
import Layout from '../components/Layout';

export default () => (
  <Layout title="Home" description="Create-Next-App">

    <div className="hero">
      <h1 className="title">Welcome to Next!</h1>
      <p className="description">To get started, edit <code>pages/index.js</code> and save to reload.</p>

      <div className="row">
<<<<<<< HEAD
        <Link href="/OBDapp">
=======
        <Link href="OBDapp">
>>>>>>> 789b72b3a85e6806d23c367654c7f16a5ce5c013
          <a className="card">
            <h3>OpenBounty App &rarr;</h3>
            <p>Learn more about Ethereum Accounts in their example</p>
          </a>
        </Link>
		<Link href="/dapp">
		  <a className="card">
			<h3>Blockchain dApp &rarr;</h3>
			<p>Sample Ethereum DApp</p>
		  </a>
		</Link>
        <Link href="/dashboard">
          <a className="card">
            <h3>Dashboard &rarr;</h3>
            <p>
              Check out the OpenBounty Dashboard
            </p>
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
