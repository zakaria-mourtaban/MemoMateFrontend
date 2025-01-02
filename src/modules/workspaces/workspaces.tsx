// Workspaces.js
import React, { useState } from 'react';
import Navbar from '../core/components/navbar';
import "./styles/workspaces.css"

const Workspaces = () => {
    const [workspaces, setWorkspaces] = useState([]);

    const addWorkspace = () => {
        const newWorkspace = { id: Date.now(), name: `Workspace ${workspaces.length + 1}` };
        setWorkspaces([...workspaces, newWorkspace]);
    }

    const deleteWorkspace = (id) => {
        setWorkspaces(workspaces.filter(workspace => workspace.id !== id));
    }

    return (
        <div className="workspaces-container">
            <Navbar />
            <div className="workspaces-header">
                <button className="workspaces-add-button" onClick={addWorkspace}>+</button>
            </div>
            <div className="workspaces-list">
                {workspaces.map(workspace => (
                    <div key={workspace.id} className="workspaces-item">
                        <span>{workspace.name}</span>
                        <button className="workspaces-delete-button" onClick={() => deleteWorkspace(workspace.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Workspaces;