import { describe, it, expect, beforeEach } from "vitest";
import { initAddBookmarkForm } from "./add-bookmark-form.js";

describe("initAddBookmarkForm", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="bookmarkForm">
        <input id="urlInput" />
        <input id="titleInput" />
        <input id="descInput" />
      </form>
    `;
  });

  it("initializes without throwing", () => {
    expect(() => initAddBookmarkForm(() => {})).not.toThrow();
  });
});