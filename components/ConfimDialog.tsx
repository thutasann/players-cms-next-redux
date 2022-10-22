import React from 'react'
import { useDispatch } from 'react-redux'
import { removeTeam } from '../slices/teamSlice';

const ConfirmModal = ({ setOpenModal, selectedTeam }) => {

    const dispatch = useDispatch();

    // Remove Team
    const removeTeamSubmit = (name: string) => {
        dispatch(removeTeam(name));
        setOpenModal(false);
    }

    return (
        <div className='modalBackground'>
            <div className="modalContainer" style={{ height: "auto"}}>
                <div className="title">
                    <h1>Delete Team</h1>
                </div>

                <div className="body">
                    <p style={{ color: "black", fontSize: "20px" }}>Are you sure you want to delete {selectedTeam}?</p>
                </div>

                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                    No
                    </button>
                    <button
                        onClick={() => removeTeamSubmit(selectedTeam)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal