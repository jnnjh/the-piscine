import { describe, test, expect, vi, beforeEach } from "vitest";
import { attachBookmarkActions } from "./bookmark-actions.js";
import * as storage from "./storage.js";

describe("attachBookmarkActions", () => {
  let bookmarks;
  let userId;

  beforeEach(() => {
    document.body.innerHTML = `
      <button data-copy="0">Copy</button>
      <button data-like="0">Like</button>
    `;

    bookmarks = [
      { url: "https://example.com", likes: 0 }
    ];

    userId = "1";

    // mock storage
    vi.spyOn(storage, "getData").mockReturnValue([...bookmarks]);
    vi.spyOn(storage, "setData").mockImplementation(() => {});

    // mock clipboard
    global.navigator.clipboard = {
      writeText: vi.fn()
    };

    // mock reload
    delete global.location;
    global.location = { reload: vi.fn() };
  });

  test("copy button calls navigator.clipboard.writeText with correct URL", () => {
    attachBookmarkActions(userId, bookmarks);

    const copyBtn = document.querySelector("[data-copy]");
    copyBtn.click();

    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith("https://example.com");
  });

  test("like button increments likes and calls setData and reload", () => {
    attachBookmarkActions(userId, bookmarks);

    const likeBtn = document.querySelector("[data-like]");
    likeBtn.click();

    expect(storage.setData).toHaveBeenCalled();

    // check if likes were incremented
    const updated = storage.setData.mock.calls[0][1];
    expect(updated[0].likes).toBe(1);

    // check reload called
    expect(global.location.reload).toHaveBeenCalled();
  });
});