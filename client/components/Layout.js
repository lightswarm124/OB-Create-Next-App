import Head from './Head';
import Nav from './Nav';
import React from 'react';

class Layout extends Components {
	render() {
		return(
			<div>
		        <Head title={props.title} description={props.description} />
		        <Nav/>
		        <div className="container">
		            {props.children}
		        </div>
		    </div>
		);
	}
}

export default Layout;
