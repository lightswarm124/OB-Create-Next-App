


const Repository = ({ stars }) =>
  <div>
     Stars: {stars}
     Name: {name}
  </div>

Repository.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/users/lightswarm124/repos')
  const json = await res.json()
  return {
    stars: json.stargazers_count,
    name: json.name
   }
}

export default Repository
