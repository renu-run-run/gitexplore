import Details from "./components/Details";
import Footer from "./components/Footer";
import RepoList from "./components/RepoList";
import Search from "./components/Search";
import { github } from "./utils";
import { useEffect, useState } from "react";
import FollowersList from "./components/FollowersList";
import FollowingList from "./components/FollowingList";


function App() {
   const [detail, setDetail] = useState({});
   const [repoList, setRepoList] = useState([]);
   const [followerList, setFollowersList] = useState([]);
   const [username, setUsername] = useState("renu-run-run");
   const [isSuccessful, setSuccessful] = useState(true);
   const [followingList, setFollowingList] = useState([]);
   const [visibleComponent, setVisibleComponent] = useState(2);
   

   const searchedUsername = keyword => {
    console.log(keyword);
    setUsername(keyword);
   }

   const showLoadMore = () => {
    if(visibleComponent === 1){
      if(followerList.length === detail.followers){
        return false;
      } else {
        return true;
      };
    } else if(visibleComponent === 2){
      if(repoList.length === detail.public_repos){
        return false;
      }else{
        return true;
      }
    } else {
      if(followingList.length === detail.following){
        return false;
      }else{
        return true;
      }
    }
   }

   const loadMoreData = async _ =>{

    if(visibleComponent === 1){
      const currentPages = Math.ceil(followerList.length / 30);
      const nextPage = currentPages + 1;
      const response = await github.get(`/${username}/followers?page=${nextPage}`);
      const list = response.data;
      
      setFollowersList(currentList => {
        const newList = [...currentList, ...list];
        return newList;
      });
      //fetch more from follwer list
    }else if(visibleComponent === 2){
      const currentPages = Math.ceil(repoList.length / 30);
      const nextPage = currentPages + 1;
      const response = await github.get(`/${username}/repos?page=${nextPage}`);
      const list = response.data;
      
      setRepoList(currentList => {
        const newList = [...currentList, ...list];
        return newList;
      });
      //fetch more from repo list

    }else{
      const currentPages = Math.ceil(followerList.length / 30);
      const nextPage = currentPages + 1; 
      const response = await github.get(`/${username}/following?page=${nextPage}`);
      const list = response.data;
      
      setFollowingList(currentList => {
        const newList = [...currentList, ...list];
        return newList;
      });
      //fetch more from following list
    }

   }

  useEffect(_ => {
    setDetail({});
    setSuccessful(true);
    if(username === ""){
      return;
    }
    (async _=> {
      try{
        const response = await github.get(`/${username}`);
     console.log(response.data);
     setDetail(response.data);
      }catch(e){
        setSuccessful(false);
      }
    })();
  }, [username])


  useEffect(_=>{
    setRepoList([]);
    if(username === ""){
      return;
    }
    (async _=>{
      const repo_response = await github.get(`/${username}/repos`);
      console.log(repo_response.data);
      setRepoList(repo_response.data);
    })();
  },[username])
  

  useEffect(_=>{
    setFollowersList([]);
    if(username === ""){
      return;
    }
    (async _=> {
      const followers_response = await github.get(`/${username}/followers`);
      console.log(followers_response.data);
      setFollowersList(followers_response.data);
    })();
  },[username])

   useEffect(_ => {
    setFollowingList([]);
    (async _ =>{
      const response = await github.get(`/${username}/following`);
      setFollowingList(response.data);
    })();
   }, [username])
 


  return (
    <main >
     <Search searchedUsername = {searchedUsername} isSuccessful={isSuccessful}/>
     {detail.id === undefined ? (
      false
      
     ) : (
      <>
      <Details detail={detail} changeVisibleComponent={setVisibleComponent} visibleComponent={visibleComponent}/>
       {visibleComponent === 1 ? (
        <FollowersList  data={followerList}/>
       ) : (
          visibleComponent === 2 ? (
            <RepoList data={repoList}/>
          ) : (
            <FollowingList data={followingList} />
          )
       )}

       {showLoadMore() === true ? (
        <div className="card load-more">
        <button onClick={loadMoreData}>load more</button>
        </div>
       ) : (false)}
       
      </>
      
     )}
     
     <Footer/>
    </main>
  );
}

export default App;
