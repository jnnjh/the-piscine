import { describe, it, expect, beforeEach } from "vitest";
import { initAddBookmarkForm } from "./add-bookmark.js";
import { vi } from "vitest";

vi.mock("./user-selection.js", () => ({
  getCurrentUser: vi.fn(),
}));

import { getCurrentUser } from "./user-selection.js";

vi.mock("./storage.js", () => ({
  getData: vi.fn(),
  setData: vi.fn(),
}));

import { getData, setData } from "./storage.js";

global.uuidv4 = vi.fn();


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

it("calls onUpdate after saving", () => {
  getCurrentUser.mockReturnValue("user-1");
  getData.mockReturnValue([]);
  uuidv4.mockReturnValue("mock-id");

  const onUpdate = vi.fn();

  initAddBookmarkForm(onUpdate);

  const form = document.getElementById("bookmarkForm");
  form.dispatchEvent(new Event("submit", { bubbles: true }));

  expect(onUpdate).toHaveBeenCalledWith("user-1");
});

it("resets the form after submission", () => {
  getCurrentUser.mockReturnValue("user-1");
  getData.mockReturnValue([]);
  uuidv4.mockReturnValue("mock-id");

  initAddBookmarkForm(() => {});

  const urlInput = document.getElementById("urlInput");
  urlInput.value = "https://test.com";

  const form = document.getElementById("bookmarkForm");
  form.dispatchEvent(new Event("submit", { bubbles: true }));

  expect(urlInput.value).toBe("");
});

it("adds new bookmark to storage", () => {
  getCurrentUser.mockReturnValue("user-1");
  getData.mockReturnValue([]);
  uuidv4.mockReturnValue("mock-id");

  initAddBookmarkForm(() => {});

  document.getElementById("urlInput").value = "https://test.com";
  document.getElementById("titleInput").value = "Test";
  document.getElementById("descInput").value = "Desc";

  const form = document.getElementById("bookmarkForm");
  form.dispatchEvent(new Event("submit", { bubbles: true }));

  expect(setData).toHaveBeenCalledWith(
    "user-1",
    expect.arrayContaining([
      expect.objectContaining({
        id: "mock-id",
        url: "https://test.com",
        title: "Test",
        description: "Desc",
        likes: 0,
      }),
    ])
  );
});