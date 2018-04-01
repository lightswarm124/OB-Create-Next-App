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
/*
					#devRepositories {
						display: -webkit-flex;display: -moz-flex;display: -ms-flex;display: -o-flex;display: flex;
						justify-content: space-between;
						-ms-align-items: center;align-items: center;
						-webkit-flex-wrap: wrap;-moz-flex-wrap: wrap;-ms-flex-wrap: wrap;-o-flex-wrap: wrap;flex-wrap: wrap;
						max-width: 768px;
						width: 90%;
						margin: 0 auto;
						padding: 70px 0;
					}
					.repo {
						position: relative;
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
						position: absolute;
						bottom: 10px;
						left: 0;
						right: 0;
						display: -webkit-flex;display: -moz-flex;display: -ms-flex;display: -o-flex;display: flex;
						justify-content: center;
						-ms-align-items: center;align-items: center;
						-webkit-flex-direction: column;-moz-flex-direction: column;-ms-flex-direction: column;-o-flex-direction: column;flex-direction: column;
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
*/
