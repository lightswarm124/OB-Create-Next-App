import Head from './Head';
import Nav from './Nav';

const Layout = (props) => (
    <div>
        <Head title={props.title} description={props.description} />
        <Nav/>
        <div className="container">
            {props.children}
        </div>
    </div>
);

export default Layout;
