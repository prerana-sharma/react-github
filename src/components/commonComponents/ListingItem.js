import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import DateConvert from "../../helper";
import { useNavigate } from 'react-router-dom';

const ListingItem = props => {
	const history = useNavigate();
	const { issueList } = props;
  const [issueListArray, setIssueListArray] = useState([]);

	useEffect(() => {
		setIssueListArray(issueList);
	},[issueList])
	console.log("issueListArray",issueListArray);

	const handleRoute = (idNumber) =>{
		history(`/details/${idNumber}`);
	}
  return (
    <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
			{issueListArray?.map((item,i)=>{
				let cretedAt = DateConvert(item.created_at);
				return (
					<>
						<ListItem 
							alignItems="flex-start" key={i} 
							onClick={(e) => handleRoute(item.number) }>
						<ListItemIcon>
							<ModeStandbyIcon fontSize="small"/>
						</ListItemIcon>
							<ListItemText
								style={{cursor: "pointer"}}
								primary={item.title}
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'inline' }}
											component="span"
											variant="body2"
										>
											{`#${item.number} ${item.state === "open"?"opened":""} ${cretedAt} ago by ${item.user.login}`}
										</Typography>
										<Typography
											sx={{ display: 'block' }}
											component="span"
											variant="body2"
											
										>
											<strong>{`Comments:${item.comments}`}</strong>
										</Typography>
									</React.Fragment>
								}
							/>
						</ListItem>
						<Divider  component="li" />
					</>
				)
			})}
    </List>
  );
}

export default ListingItem;
