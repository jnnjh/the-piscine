import { describe, it, expect, beforeEach, vi } from "vitest";
import { initAddBookmarkForm } from "./add-bookmark.js";


vi.mock("./user-selection.js", () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("./storage.js", () => ({
  getData: vi.fn(),
  setData: vi.fn(),
}));

import { getCurrentUser } from "./user-selection.js";
import { getData, setData } from "./storage.js";

describe("initAddBookmarkForm", () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="bookmarkForm">
        <input id="urlInput" />
        <input id="titleInput" />
        <input id="descInput" />
      </form>
    `;

    vi.clearAllMocks();
  });

});