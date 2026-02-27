import { describe, test, expect, beforeEach, vi } from "vitest";
import { initUserSelection, getCurrentUser } from "./user-selection.js";
import * as storage from "./storage.js";

// mock getUserIds
vi.spyOn(storage, "getUserIds").mockReturnValue(["1", "2", "3", "4", "5"]);

describe("User Selection", () => {

  beforeEach(() => {
    // clear the DOM before each test
    document.body.innerHTML = `
      <select id="userSelect"></select>
    `;
  });

  test("dropdown is populated with users", () => {
    const mockCallback = vi.fn();

    initUserSelection(mockCallback);

    const select = document.getElementById("userSelect");

    expect(select.children.length).toBe(5);
    expect(select.children[0].value).toBe("1");
    expect(select.children[0].textContent).toBe("User 1");
  });

    test("first user is selected by default", () => {
    const mockCallback = vi.fn();

    initUserSelection(mockCallback);

    expect(getCurrentUser()).toBe("1");
    expect(mockCallback).toHaveBeenCalledWith("1");

  });

  test("changing selection updates currentUser and calls callback", () => {
    const mockCallback = vi.fn();

    initUserSelection(mockCallback);

    const select = document.getElementById("userSelect");

    // change selected user
    select.value = "3";
    select.dispatchEvent(new Event("change"));

    expect(getCurrentUser()).toBe("3");
    expect(mockCallback).toHaveBeenLastCalledWith("3");
  });

  });