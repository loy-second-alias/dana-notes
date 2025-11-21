import React, { useState } from 'react';
import WelcomeHeader from './components/WelcomeHeader';
import NoteList from './components/NoteList';
import FloatingActionButton from './components/FloatingActionButton';
import NoteEditor from './components/NoteEditor';
import './App.css';

function App() {
  const [notes, setNotes] = useState([
    {
      id: '1',
      content: 'Welcome to Dana Notes! \n\nThis is a demo note to get you started. Tap the + button to create your own.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  // No useEffect for loading notes (ephemeral)

  const handleCreateNote = () => {
    setCurrentNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsEditorOpen(true);
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const newNotes = notes.filter((n) => n.id !== noteId);
      setNotes(newNotes);
    }
  };

  const handleSaveNote = (note) => {
    let newNotes;
    if (currentNote) {
      // Update existing
      newNotes = notes.map((n) => (n.id === note.id ? note : n));
    } else {
      // Create new
      newNotes = [note, ...notes];
    }

    // Sort by updatedAt desc
    newNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    setNotes(newNotes);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setCurrentNote(null);
  };

  return (
    <div className="App container">
      <WelcomeHeader />

      <NoteList
        notes={notes}
        onNoteClick={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />

      <FloatingActionButton onClick={handleCreateNote} />

      {isEditorOpen && (
        <NoteEditor
          note={currentNote}
          onClose={handleCloseEditor}
          onSave={handleSaveNote}
        />
      )}
    </div>
  );
}

export default App;
