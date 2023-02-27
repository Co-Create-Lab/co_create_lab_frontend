import React from "react";
import axiosClient from "../axiosClient";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function Bookmark({ id }) {
  const [bookmarkProject, setBookmarkProjects] = useState([]);
  const [bookmarkIcon, setBookmarkIcon] = useState(false);
  useEffect(() => {
    axiosClient
      .get(`/users/bookmarks`)
      .then((res) => {
        setBookmarkProjects(res.data);
        if (res.data.find((project) => project._id === id)) {
          setBookmarkIcon(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleBookmarkClick = () => {
    const isBookmarked = bookmarkProject.find((project) => project._id === id);
    if (isBookmarked) {
      axiosClient
        .post(`/users/remove`, { projectId: id })
        .then((res) => {
          setBookmarkProjects(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosClient
        .post(`/users/bookmarks`, { projectId: id })
        .then((res) => {
          setBookmarkProjects(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setBookmarkIcon(!bookmarkIcon);
  };

  return (
    <div className="bg-light">
      <p className="bg-light ps-2" onClick={handleBookmarkClick}>
        {bookmarkIcon ? (
          <BsBookmarkHeartFill
            size={25}
            style={{ fill: "#f66b0e", backgroundColor: "white" }}
          />
        ) : (
          <BsBookmarkHeart size={25} style={{ backgroundColor: "white" }} />
        )}
      </p>
    </div>
  );
}
