import { describe, it, expect, beforeEach } from "vitest";
import { initAddBookmarkForm } from "./add-bookmark-form.js";
import { vi } from "vitest";

vi.mock("./user-selection.js", () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("./storage.js", () => ({
  getData: vi.fn(),
  setData: vi.fn(),
}));

import { getData } from "./storage.js";

import { getCurrentUser } from "./user-selection.js";

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

it("calls getCurrentUser on submit", () => {
  initAddBookmarkForm(() => {});

  const form = document.getElementById("bookmarkForm");
  form.dispatchEvent(new Event("submit", { bubbles: true }));

  expect(getCurrentUser).toHaveBeenCalled();
});

it("calls getData with current user id", () => {
  getCurrentUser.mockReturnValue("user-1");

  initAddBookmarkForm(() => {});

  const form = document.getElementById("bookmarkForm");
  form.dispatchEvent(new Event("submit", { bubbles: true }));

  expect(getData).toHaveBeenCalledWith("user-1");
});