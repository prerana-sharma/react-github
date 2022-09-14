import React, {useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import {useParams} from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import DateConvert from "../helper";

const GithubIssueDetail = (props) => {
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [issueDetails, setIssueDetails] = useState({});
  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    getIssueDetails();
  }, [getIssueDetails]);

  const getIssueDetails = () => {
    try {
      setIsLoading(true);
      let apiUrl = `https://api.github.com/repos/facebook/react/issues/${id}`;
      fetch(apiUrl)
         .then((response) => response.json())
         .then((data) => {
            setIssueDetails(data)
            setLoginUser(data.user);
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
      <Box style={{margin:"25px"}} >
        <Typography
          sx={{ display: 'block' }}
          component="h1"
        >
          <h2>
            {`${issueDetails?.title}`}
            <span style={{
              color:"#6e767e"
            }}>{`#${id}`}</span>
          </h2>
        </Typography>
        <Typography
          sx={{ display: 'block' }}
          component="h1"
        >
          <span 
            title="Status: Open" 
            data-view-component="true" 
            style={{
              color:"#fff",
              backgroundColor:"#2da44e",  
              display: "inline-block",
              padding: "5px 12px",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "20px",
              textAlign: "center",
              whiteSpace: "nowrap",
              borderRadius: "2em",
              border: "1px solid transparent",
              fill: "currentColor"
            }}
          >
            <svg height="16" class="octicon octicon-issue-opened" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path><path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path></svg> Open
          </span>
          <span style={{color:"#6e767e"}}><strong>{" "}{loginUser?.login}</strong> {`opened this issue on ${DateConvert(issueDetails?.created_at)}  ${issueDetails?.comments} comments`}</span>
        </Typography>
        
      </Box>
      <Divider/>
        <Accordion expanded>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <span style={{color:"#6e767e"}}><strong>{loginUser?.login}</strong> {`commented ${DateConvert(issueDetails?.created_at)} ago`}
              </span>
              </Typography>
          </AccordionSummary>
          <Divider/>
          <AccordionDetails>
            <Typography>
              {issueDetails.body}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}

export default GithubIssueDetail;