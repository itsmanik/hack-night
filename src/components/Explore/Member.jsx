import classes from "./Explore.module.css";
import { useState } from "react";
import axiosInstance from "../../axios";

const Member = (props) => {
  const [request, setRequest] = useState(false);

  const handleConnectionRequest = async () => {
    try {
      // Assume user1_id is available as the current user’s ID, e.g., from props or a global state
      const user1_id = props.alumnus.id;

      const response = await axiosInstance.post(`/api/send_connection/${user1_id}`);

      if (response.status === 201) {
        setRequest(true);
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
      // Optional: Show an error message to the user if the request fails
    }
  };

  return (
    <div className={classes.box} key={props.alumnus.user_id}>
      <img
        src={props.alumnus.profile_picture || "default-profile-image-url"}
        alt={props.alumnus.name}
        className={classes.img}
      />
      <div className={classes.one}>
        <h2 className={classes.username}>{props.alumnus.name}</h2>
        <span className={classes.position}>
          {props.alumnus.position}, {props.alumnus.company}
        </span>
        <p>{props.alumnus.email}</p>
        <p>Skills: {props.alumnus.skills}</p>
      </div>
      <button
        type="button"
        className={`${classes.button} ${request ? classes.gray : classes.normal}`}
        onClick={handleConnectionRequest}
        disabled={request}
      >
        {request ? "Requested" : "Connect"}
      </button>
    </div>
  );
};

export default Member;