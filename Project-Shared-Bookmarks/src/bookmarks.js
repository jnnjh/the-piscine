export function createBookmark({ url, title, description }) {
  return {
    id: crypto.randomUUID(),
    url,
    title,
    description,
    createdAt: Date.now(),
    likes: 0
  };
}

export function sortBookmarks(bookmarks) {
    //sort from new ones to old ones
  return [...bookmarks].sort((a, b) => b.createdAt - a.createdAt)
}

export function incrementLikes(bookmarks, id) {
  return bookmarks.map(b =>
    b.id === id ? { ...b, likes: b.likes + 1 } : b
  );
}