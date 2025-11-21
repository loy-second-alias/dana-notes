import React from 'react';
import { Plus } from 'lucide-react';
import './FloatingActionButton.css';

const FloatingActionButton = ({ onClick }) => {
    return (
        <button className="fab" onClick={onClick} aria-label="Create new note">
            <Plus size={28} strokeWidth={2.5} />
        </button>
    );
};

export default FloatingActionButton;
