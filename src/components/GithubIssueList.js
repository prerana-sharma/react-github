import React, { useState, useEffect } from "react";
import ListingItem from './commonComponents/ListingItem';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchBar from "./commonComponents/SearchBar";
import SimplePagination from "./commonComponents/Pagination";

const GithubIssueList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [issueList, setIssueList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getIssueList();
  }, [getIssueList, searchQuery]);


  const getIssueList = () => {
    try {
      setIsLoading(true);
      let apiUrl = "https://api.github.com/repos/facebook/react/issues?page=1"
      if(searchQuery){
        apiUrl = `https://api.github.com/search/issues?repo=facebook/react&q=${searchQuery}`
      }
      fetch(apiUrl)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            if(searchQuery){
              setIssueList(data.items);
            }else{
              setIssueList(data);
            }
            setIsLoading(false);
         })
         .catch((err) => {
            console.log(err.message);
         });
    } catch (err) {
      setIsLoading(false);
      console.log(err)
    }
  };

  return (
    <>
      <Container fixed>
        <Box style={{
          height : "50px",
          border:"1px solid gray",
          borderRadius: "1px",
          marginBottom:"20px"}} >
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Box>
        <Box sx={{ bgcolor: '#cfe8fc', width:"100%",}} 
        style={{
          border:"1px solid gray",
          borderRadius: "1px"}} >
        <ListingItem issueList={issueList} />
        </Box>
        <div style={{display: "flex !important" }}>
          <SimplePagination />
        </div>
      </Container>
    </>
  );
};

export default GithubIssueList;
