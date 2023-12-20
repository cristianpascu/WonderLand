import { expect, describe, it } from "vitest";
import { Rectangle } from "./Rectangle";

import { render, screen } from "./test/utils";

describe("Rectangle", () => {
    it("should live a simple life", async () => {
        // const mockFunction = vi.fn(() => {});
        render(<Rectangle />);
        expect(
            await screen.findByText("I am living a simple life")
        ).toBeDefined();
    });
});
