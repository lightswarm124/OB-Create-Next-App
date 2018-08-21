import React, { Component } from 'react'
import Link from 'next/link';

const Repo = ({...props}) => {
	return (
			<div className="repo">
				<Link href={{ pathname: '/repo', query: { key: props.id, user: props.owner.login, name:props.name } }}>
					<a>Repo Name: {props.name}</a>
				</Link><br />
				<Link href={`https://github.com/${props.owner.login}/${props.name}`}>
					<a>Repo ID: {props.id}</a>
				</Link><br />
				<a>Repo Description: {props.description}</a><br />
				<Link href={`https://github.com/${props.owner.login}`}>
					<a>Repo Owner: {props.owner.login}</a>
				</Link><br />
				<a>Owner_ID: {props.owner.id}</a><br />
				<a>Created At: {props.created_at}</a><br /><br />
				<div className="buttons">
					<button>Deploy Contract</button>
					<button>Project Owner</button>
					<button>Contract Address</button>
					<button>Project Manager(s)</button>
					<button>Lock Project</button>
					<button>Unlock Project</button>
				</div>
				<style jsx>{`
					.repo {
						padding: 10px 10px 10px;
						border: 1px solid #9B9B9B;
					}
					. buttons {
						top: 0px;
						right: 0px;
					}
				`}</style>
			</div>
	)
}

export default Repo;
