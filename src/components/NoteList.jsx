import React from 'react';
import { FileText } from 'lucide-react';
import NoteCard from './NoteCard';
import './NoteList.css';

const NoteList = ({ notes, onNoteClick, onDeleteNote }) => {
    if (notes.length === 0) {
        return (
            <div className="note-list-empty">
                <div className="empty-state-icon">
                    <FileText size={64} strokeWidth={1} />
                </div>
                <p className="empty-state-text">No notes yet. Tap the + button to start writing.</p>
            </div>
        );
    }

    return (
        <div className="note-list">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onClick={onNoteClick}
                    onDelete={onDeleteNote}
                />
            ))}
        </div>
    );
};

export default NoteList;
