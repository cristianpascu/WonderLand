import { useEffect, useState } from "react";
import { Metronome } from "./model";

const CLICK = new Audio("/click.mp3");

export const MetronomeUI: React.FC<{
    metronome: Metronome;
}> = ({}) => {
    const [clicking, setClicking] = useState(false);

    useEffect(() => {
        let i: NodeJS.Timeout;
        if (clicking) {
            i = setInterval(() => {
                CLICK.pause();
                CLICK.play();
            }, (60 * 1000) / 220);
            CLICK.pause();
            CLICK.play();
        }

        return () => {
            clearInterval(i);
        };
    }, [clicking]);

    return (
        <div
            style={{
                maxWidth: 750,
                maxHeight: 750,
                width: "100%",
                height: "100%",
            }}
            className="flex flex-row flex-wrap"
        >
            <button onClick={() => setClicking(!clicking)}>Play</button>
        </div>
    );
};
