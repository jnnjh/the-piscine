import { describe, test, expect, vi, beforeEach } from "vitest";
import { attachBookmarkActions } from "./bookmark-actions.js";
import * as storage from "./storage.js";

describe("attachBookmarkActions", () => {
  let userId;
  let mockUpdate;

  beforeEach(() => {
    document.body.innerHTML = `
      <button data-copy="abc123">Copy</button>
      <button data-like="abc123">Like</button>
    `;

    userId = "1";
    mockUpdate = vi.fn();

    const bookmarks = [
      { id: "abc123", url: "https://example.com", likes: 0 }
    ];

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

  test("copy button copies correct URL", () => {
    attachBookmarkActions(userId, mockUpdate);

    document.querySelector("[data-copy]").click();

    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith("https://example.com");
  });

  test("like button increments likes", () => {
    attachBookmarkActions(userId, mockUpdate);

    document.querySelector("[data-like]").click();

    expect(storage.setData).toHaveBeenCalled();

    const updated = storage.setData.mock.calls[0][1];
    expect(updated[0].likes).toBe(1);
  });
});