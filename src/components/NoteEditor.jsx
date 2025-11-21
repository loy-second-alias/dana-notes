import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import './NoteEditor.css';

const NoteEditor = ({ note, onClose, onSave, onDelete }) => {
    const [content, setContent] = useState(note ? note.content : '');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const textareaRef = useRef(null);
    const saveTimeoutRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            // Move cursor to end
            textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
        }
    }, []);

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        setIsSaving(true);

        // Debounce save
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
            handleSave(newContent);
        }, 1500);
    };

    const handleSave = (text) => {
        onSave({
            id: note ? note.id : Date.now().toString(),
            content: text,
            createdAt: note ? note.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        setIsSaving(false);
        setLastSaved(new Date());
    };

    const handleManualSave = () => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        handleSave(content);
        onClose();
    };

    return (
        <div className="note-editor-overlay">
            <div className="note-editor-modal">
                <div className="editor-toolbar">
                    <button className="close-btn" onClick={onClose} aria-label="Close editor">
                        <ArrowLeft size={24} />
                    </button>
                    <button
                        className="save-btn"
                        onClick={handleManualSave}
                        disabled={!content.trim()}
                    >
                        Save
                    </button>
                </div>

                <div className="editor-meta">
                    {lastSaved ? (
                        <span className="save-status">
                            Saved <Check size={12} style={{ marginLeft: 4 }} />
                        </span>
                    ) : (
                        <span className="save-status">{isSaving ? 'Saving...' : 'Last edited just now'}</span>
                    )}
                </div>

                <textarea
                    ref={textareaRef}
                    className="editor-textarea"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Start writing..."
                />
            </div>
        </div>
    );
};

export default NoteEditor;
