import React from 'react';
import { Trash2 } from 'lucide-react';
import './NoteCard.css';

const NoteCard = ({ note, onClick, onDelete }) => {
    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(note.id);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        // If less than 24 hours, show "X hours ago"
        if (diff < 24 * 60 * 60 * 1000) {
            if (diff < 60 * 60 * 1000) {
                const minutes = Math.floor(diff / (60 * 1000));
                return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
            }
            const hours = Math.floor(diff / (60 * 60 * 1000));
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        }

        // Otherwise show date
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="note-card glass-panel" onClick={() => onClick(note)}>
            <div className="note-content-preview">
                {note.content || <span className="empty-note-text">Empty note</span>}
            </div>
            <div className="note-footer">
                <span className="note-timestamp">{formatDate(note.updatedAt)}</span>
                <button className="delete-btn" onClick={handleDelete} aria-label="Delete note">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default NoteCard;
