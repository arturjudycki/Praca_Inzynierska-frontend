import React from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { username } = useParams();

  return (
    <div>
      <div>Witaj młody człowieku - {username}</div>
    </div>
  );
};

export default UserPage;
