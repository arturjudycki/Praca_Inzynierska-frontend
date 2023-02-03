import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AssignArtist = ({ toggleAssignModal, props }) => {
  const navigate = useNavigate();
  const id_music_album = props.album.id_music_album;

  return (
    <section className="assign-artist">
      <div className="modal">
        <div
          onClick={() => {
            toggleAssignModal();
          }}
          className="overlay"
        ></div>
        <div className="modal-content"></div>
      </div>
    </section>
  );
};

export default AssignArtist;
