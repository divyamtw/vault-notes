const NoteCard = ({ note, onEdit, onDelete }) => {
  const formattedDate = new Date(note.updatedAt || note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className={`group relative p-6 bg-neutral-900/40 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${note.isImportant ? 'border-fuchsia-500/50 shadow-[0_0_15px_-3px_rgba(192,38,211,0.2)]' : 'border-neutral-800 hover:border-neutral-700'}`}>
      
      {note.isImportant && (
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-6 h-6 bg-fuchsia-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white truncate pr-4">{note.title}</h3>
      </div>
      
      <p className="text-neutral-400 text-sm mb-6 line-clamp-4 leading-relaxed">
        {note.content}
      </p>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-800/50">
        <span className="text-xs text-neutral-500 font-medium">{formattedDate}</span>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={() => onEdit(note)}
            className="p-1.5 text-neutral-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
            title="Edit Note"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(note._id)}
            className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Delete Note"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
