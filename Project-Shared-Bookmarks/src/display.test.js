import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("./storage.js", () => ({
    getData: vi.fn(),
}));

vi.mock("./bookmark-actions.js", () => ({
    attachBookmarkActions: vi.fn(),
}));

import { renderBookmarks } from "./display.js";
import { getData } from "./storage.js";
import { attachBookmarkActions } from "./bookmark-actions.js";

describe("renderBookmarks", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="bookmarkSection"></div>
        `;

        vi.clearAllMocks();
    });

    it("renders empty message when user has no bookmarks", () => {
        getData.mockReturnValue([]);

        renderBookmarks("user-1");

        const container = document.getElementById("bookmarkSection");

        expect(container.innerHTML)
            .toContain("This user has no bookmarks yet");
    });

});