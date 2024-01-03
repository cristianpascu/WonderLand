import { expect, describe, it, vi } from "vitest";
import { MetronomeUI } from "./Metronome";

import { render, userEvent } from "./test/utils";

describe("Metronome", () => {
    it("should handle click correctly", async () => {
        const handleClick = vi.fn(() => {});
        const { container } = render(
            <MetronomeUI
                metronome={{
                    bpm: 120,
                }}
            />
        );
        const rect = container.querySelector("[data-testid='root']");
        expect(rect).toBeInTheDocument();
        await userEvent.click(rect!);
        expect(handleClick).toHaveBeenCalled();
    });
});
