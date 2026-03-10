import { useState, useEffect } from "react";

const NoteModal = ({ isOpen, onClose, onSave, note, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isImportant: false,
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || "",
        content: note.content || "",
        isImportant: note.isImportant || false,
      });
    } else {
      setFormData({ title: "", content: "", isImportant: false });
    }
  }, [note, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-[scale-up_0.2s_ease-out]">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {note ? 'Edit Note' : 'Create Note'}
            </h2>
            <button 
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Note Title (optional)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-transparent text-xl text-white font-semibold placeholder-neutral-600 focus:outline-none border-b border-transparent focus:border-indigo-500/50 pb-2 transition-colors"
              />
            </div>
            
            <div>
              <textarea
                placeholder="What's on your mind?"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows="8"
                className="w-full bg-neutral-900/50 text-neutral-300 placeholder-neutral-600 resize-none focus:outline-none border border-neutral-800 focus:border-indigo-500/50 rounded-xl p-4 transition-colors"
                required
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.isImportant}
                    onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                  />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${formData.isImportant ? 'bg-fuchsia-600' : 'bg-neutral-700'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.isImportant ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <div className="ml-3 text-sm font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors">
                  Mark as Important
                </div>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-0.5"
                >
                  {isLoading ? 'Saving...' : 'Save Note'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
