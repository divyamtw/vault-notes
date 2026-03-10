import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import { getAllNotes, createNote, updateNote, deleteNote } from "../api/notes.service";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentNote, setCurrentNote] = useState(null); // null means text create, object means edit

  // Fetch notes on load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const data = await getAllNotes();
      setNotes(data.notes || []);
    } catch (err) {
      setError("Failed to load notes. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrEdit = async (noteData) => {
    setIsSaving(true);
    try {
      if (currentNote) {
        // Update existing
        await updateNote(currentNote._id, noteData);
      } else {
        // Create new
        await createNote(noteData);
      }
      await fetchNotes(); // Refresh list
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error saving note: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await deleteNote(id);
      await fetchNotes(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Error deleting note.");
    }
  };

  const openCreateModal = () => {
    setCurrentNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 flex flex-col relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-fuchsia-600/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 relative">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">My Vault</h1>
          <button 
            onClick={openCreateModal}
            className="group flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Note</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 w-full">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-400 animate-pulse">Decrypting vault...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-neutral-800 rounded-3xl bg-neutral-900/20 backdrop-blur-sm">
            <div className="w-20 h-20 mb-6 rounded-full bg-neutral-800/50 flex items-center justify-center">
              <svg className="w-10 h-10 text-neutral-500 animate-[pulse_3s_ease-in-out_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Your vault is empty</h3>
            <p className="text-neutral-400 max-w-sm mb-6 leading-relaxed">
              Start capturing your brilliant ideas. Your first note is just a click away.
            </p>
            <button 
              onClick={openCreateModal}
              className="px-6 py-2 border border-neutral-700 hover:border-indigo-500/50 rounded-xl text-neutral-300 hover:text-white transition-all duration-300"
            >
              Create First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {notes.map(note => (
              <NoteCard 
                key={note._id} 
                note={note} 
                onEdit={openEditModal} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </main>

      <NoteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrEdit}
        note={currentNote}
        isLoading={isSaving}
      />
    </div>
  );
};

export default HomePage;