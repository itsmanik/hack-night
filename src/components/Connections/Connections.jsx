import React, { useState, useEffect } from "react";
import classes from "./Connections.module.css";
import axios from "../../axios";

const Connections = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const [connections, setConnections] = useState([]);

  // Fetch invitations and connections from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invitations
        const invitationResponse = await axios.get("/api/invitations", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`, // assuming JWT is stored in localStorage
          },
        });
        setInvitations(invitationResponse.data);

        // Fetch connections
        const connectionResponse = await axios.get("/api/connections", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        });
        setConnections(connectionResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAccept = async () => {
    try {
      // Call the backend API to accept the connection
      await axios.post(
        `/api/accept_invitation/${selectedInvitation.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`, // Include JWT token for authorization
          },
        }
      );
      alert("Connection request accepted!");
      // Update state to reflect changes
      setShowModal(false);
      setConnections((prevConnections) => [
        ...prevConnections,
        {
          id: selectedInvitation.id,
          name: selectedInvitation.name,
          job: selectedInvitation.job,
          imgScr: selectedInvitation.profile_picture,
        },
      ]);
      // Optionally, remove the invitation from the list
      setInvitations((prevInvitations) =>
        prevInvitations.filter(
          (invitation) => invitation.id !== selectedInvitation.id
        )
      );
    } catch (error) {
      console.error("Error accepting connection:", error);
      alert("Failed to accept the connection request.");
    }
  };

  const handleReject = () => {
    alert("Connection request rejected!");
    setShowModal(false);
  };

  const handleModalOpen = (invitation) => {
    setSelectedInvitation(invitation);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedInvitation(null);
  };

  return (
    <div className={classes.mainContainer}>
      {/* Invitations Section */}
      <div className={classes.invitationSection}>
        <h2 className={classes.sectionTitle}>Connection Invitations</h2>
        {invitations.length > 0 ? (
          <div className={classes.invitationsList}>
            {invitations.map((invitation, index) => (
              <div key={index} className={classes.invitationCard}>
                <img
                  src={invitation.profile_picture}
                  alt={invitation.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className={classes.invitationDetails}>
                  <h3 className={classes.invitationName}>{invitation.name}</h3>
                  <p className={classes.invitationJob}>{invitation.job}</p>
                  <button
                    className={classes.invitationButton}
                    onClick={() => handleModalOpen(invitation)}
                  >
                    View Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No new connection invitations.</p>
        )}
      </div>

      {/* Connections Section */}
      <div className={classes.connectionSection}>
        <h2 className={classes.sectionTitle}>Your Connections</h2>
        {connections.length > 0 ? (
          <div className={classes.connectionsList}>
            {connections.map((connection, index) => (
              <div key={index} className={classes.connectionCard}>
                <img
                  src={connection.profile_picture}
                  alt={connection.name}
                  className="w-32 h-32 mx-auto rounded-full"
                />
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{connection.name}</h2>
                  <p className="text-sm text-gray-600">{connection.job}</p>
                  <a href="#" className="text-purple-600">
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No connections available.</p>
        )}
      </div>

      {/* Modal for Accepting or Rejecting Invitation */}
      {showModal && (
        <div className={classes.modalOverlay}>
          <div className={classes.modalContent}>
            <h3 className={classes.modalTitle}>
              Connection Request from {selectedInvitation.name}
            </h3>
            <p className={classes.modalJob}>{selectedInvitation.job}</p>
            <div className={classes.modalActions}>
              <button className={classes.acceptButton} onClick={handleAccept}>
                Accept
              </button>
              <button className={classes.rejectButton} onClick={handleReject}>
                Reject
              </button>
            </div>
            <button className={classes.closeModal} onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;
