import { expect, describe, it, vi } from "vitest";
import { Rectangle } from "./Rectangle";

import { render, userEvent } from "./test/utils";

describe("Rectangle", () => {
    it("should handle click correctly", async () => {
        const handleClick = vi.fn(() => {});
        const { container } = render(
            <Rectangle
                square={{
                    id: "root",
                    color: "yellow",
                    leafs: [],
                }}
                handleClick={handleClick}
            />
        );
        const rect = container.querySelector("[data-testid='root']");
        expect(rect).toBeInTheDocument();
        await userEvent.click(rect!);
        expect(handleClick).toHaveBeenCalled();
    });
});
