import React from "react";

// In: liked or not?
// Out: liked, unliked
function Like(props) {
    let likeClass = "fa-heart";
    props.movie.liked ? (likeClass += " fas pink") : (likeClass += " far");
    console.log("Like Rendered");
    return <i className={likeClass} style={{ cursor: "pointer" }} onClick={() => props.onClick()}></i>;
}

export default Like;
