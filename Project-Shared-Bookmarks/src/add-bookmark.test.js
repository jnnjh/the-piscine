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

    it("initializes without throwing", () => {
        expect(() => initAddBookmarkForm(() => {})).not.toThrow();
    });

    it("calls getCurrentUser on submit", () => {
        initAddBookmarkForm(() => {});

        document.getElementById("bookmarkForm")
            .dispatchEvent(new Event("submit", { bubbles: true }));

        expect(getCurrentUser).toHaveBeenCalled();
    });

    it("calls getData with current user id", () => {
        getCurrentUser.mockReturnValue("user-1");

        initAddBookmarkForm(() => {});
        document.getElementById("bookmarkForm")
            .dispatchEvent(new Event("submit", { bubbles: true }));

        expect(getData).toHaveBeenCalledWith("user-1");
    });

    it("calls onUpdate after saving", () => {
        getCurrentUser.mockReturnValue("user-1");
        getData.mockReturnValue([]);

        const onUpdate = vi.fn();
        initAddBookmarkForm(onUpdate);

        document.getElementById("bookmarkForm")
            .dispatchEvent(new Event("submit", { bubbles: true }));

            expect(onUpdate).toHaveBeenCalledWith("user-1");
        });

});