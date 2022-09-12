import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import GithubIssueList from "./GithubIssueList";
import GithubIssueDetail from "./GithubIssueDetail";

const App =() => {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<GithubIssueList />} />
			<Route path="/details" element={<GithubIssueDetail />} />
		</Routes>
		</BrowserRouter>
	);
}
export default App
