import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  pattern: string;
  content: string;
  date: string;
}

const initialNotes: Note[] = [
  {
    id: 'n1',
    title: 'Two Pointers vs Sliding Window',
    pattern: 'Two Pointers',
    content: 'Use two pointers inward when array is sorted to find pairs (e.g. 3Sum). Use sliding window when dealing with contiguous subsegments where we expand right and contract left.',
    date: 'Oct 28',
  },
  {
    id: 'n2',
    title: 'Hash Map Lookup Key Formats',
    pattern: 'Hash Map',
    content: 'For Group Anagrams, sorting characters takes O(k log k). Alternatively, a 26-length frequency tuple can be serialized as a string in O(k).',
    date: 'Oct 25',
  },
  {
    id: 'n3',
    title: 'Cycle Detection: Fast & Slow Pointers',
    pattern: 'Fast & Slow Pointers',
    content: 'Floyd cycle detection: slow advances 1 step, fast advances 2 steps. When they meet, distance from head to cycle entrance equals distance from meeting point to cycle entrance.',
    date: 'Oct 20',
  },
];

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newTitle, setNewTitle] = useState('');
  const [newPattern, setNewPattern] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newTitle,
      pattern: newPattern || 'General',
      content: newContent,
      date: 'Just now',
    };

    setNotes([note, ...notes]);
    setNewTitle('');
    setNewPattern('');
    setNewContent('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Pattern Notes
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Personal algorithmic takeaways, edge cases, and memory anchors.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'New Note'}</span>
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleAddNote}
          className="bg-[#121620] border border-cyan-500/30 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Note Title (e.g., Fast & Slow Pointers nuance)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#171c26] border border-[#232b3a] text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/50"
              required
            />
            <input
              type="text"
              placeholder="Pattern (e.g., Two Pointers)"
              value={newPattern}
              onChange={(e) => setNewPattern(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-[#171c26] border border-[#232b3a] text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/50"
            />
          </div>
          <textarea
            placeholder="Write your intuition, time/space complexity, common bugs..."
            rows={3}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-[#171c26] border border-[#232b3a] text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/50"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm"
            >
              Save Note
            </button>
          </div>
        </form>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-[#121620] border border-[#1e2533] hover:border-[#273245] rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {note.pattern}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{note.date}</span>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-[#1c222e] transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{note.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{note.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
