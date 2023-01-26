const RepoList = ({data}) =>{
  console.log(data)
    return(
        <div className="card repo-list">

        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
          
          </thead>
          <tbody>
          {data.map((singleRepo, idx)=>{
            return(
              <tr id={idx}>
              <td>{idx + 1}</td>
              <td>
              <a href={singleRepo.html_url} target="_blank" rel="noreferrer">
              {singleRepo.name}
              </a>
              </td>
              
              </tr>
            )
            
          })}
          </tbody>
        </table>
          
          
        </div>
    )
}

export default RepoList;