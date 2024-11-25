import React, { useState } from "react";
import "./Addnotebook.css";

export default function Addnotebook(props) {
  const [clicked, setclicked] = useState(false);
  const [notebookname, setnotebookname] = useState("");
  const addnotefunc = async (e) => {
    e.preventDefault();
    let data = { name: notebookname, user:localStorage.getItem("data.user._id") };
    let response = await fetch("http://localhost:5000/notebook/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      props.setshouldfetch(!props.shouldfetch);
      setnotebookname("")
      setclicked(false);
    }
    // response = await response.json()
    // console.log(response)
  };
  return (
    <div className="addform">
      {clicked ? (
        <form
          onSubmit={(e) => {
            addnotefunc(e);
          }}
        >
          <div className="inputdiv">
            <input
              type="text"
              placeholder="Notebook Name"
              value={notebookname}
              onChange={(e) => setnotebookname(e.target.value)}
            />
            <button
              onClick={() => {
                setclicked(!clicked);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
          </div>
          <button className="addnotebook" type="submit" disabled={notebookname.length<3}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            Add Notebook
          </button>
        </form>
      ) : (
        ""
      )}
      {!clicked ? (
        <button
          onClick={() => {
            setclicked(!clicked);
          }}
          className="addnotebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          Add Notebook
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
