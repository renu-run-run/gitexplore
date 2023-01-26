import moment from "moment/moment"
const Details = ({detail, changeVisibleComponent, visibleComponent}) => {
   
    return(
    <div className="card detail">
       <img src={detail.avatar_url} alt="Profile" className="section-left" />  
       <div className="section-right">
       <h3>{detail.name}</h3>
       <h3><a href={detail.html_url} target="_black" rel="noreferrer">@{detail.login}</a></h3>
       <p>Member since:{moment(detail.created_at).fromNow()}</p>
       </div>


       <div className="buttons">
       <button onClick={_ => changeVisibleComponent(1)} className={visibleComponent === 1 ? "active" : ""}>
       {detail.followers}
       <span>Followers</span>
       </button>

       <button onClick={_ => changeVisibleComponent(2)} className={visibleComponent === 2 ? "active" : ""}> 
        {detail.public_repos}
        <span>Repository</span>
      </button>

       <button onClick={_ => changeVisibleComponent(3)} className={visibleComponent === 3 ? "active" : ""}>
       {detail.following}
       <span>Following</span>
       </button>
       </div>
       
    </div>
     )
}
export default Details