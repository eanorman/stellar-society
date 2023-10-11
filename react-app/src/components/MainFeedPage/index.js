import React from "react";
import "./index.css";
import NewsFeed from "../NewsFeed";

function MainFeedPage() {
  return (
    <div className="main-page-container">
      <div className="news-feed">
        <NewsFeed />
      </div>
    </div>
  );
}

export default MainFeedPage;
