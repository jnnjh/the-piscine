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

    it("renders bookmarks into the container", () => {
        getData.mockReturnValue([
            {
                id: "1",
                url: "https://example.com",
                title: "Example",
                description: "Test description",
                createdAt: Date.now(),
                likes: 3,
            },
        ]);

        renderBookmarks("user-1");

        const container = document.getElementById("bookmarkSection");

        expect(container.innerHTML).toContain("Example");
        expect(container.innerHTML).toContain("Test description");
        expect(container.innerHTML).toContain("❤️ 3");
    });

    it("renders bookmarks in reverse chronological order", () => {
        getData.mockReturnValue([
            {
                id: "1",
                url: "a",
                title: "Old",
                description: "",
                createdAt: 1000,
                likes: 0,
            },
            {
                id: "2",
                url: "b",
                title: "New",
                description: "",
                createdAt: 2000,
                likes: 0,
            },
        ]);

        renderBookmarks("user-1");

        const container = document.getElementById("bookmarkSection");

        const firstBookmark = container.querySelector(".bookmark a");

        expect(firstBookmark.textContent.trim()).toBe("New");
    });

    it("calls attachBookmarkActions after rendering", () => {
        getData.mockReturnValue([
            {
                id: "1",
                url: "https://example.com",
                title: "Example",
                description: "",
                createdAt: Date.now(),
                likes: 0,
            },
    ]);

        renderBookmarks("user-1");

        expect(attachBookmarkActions)
            .toHaveBeenCalledWith("user-1", renderBookmarks);
    });
});