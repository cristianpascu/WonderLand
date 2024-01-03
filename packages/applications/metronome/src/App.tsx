import "./Application.css";
import { MetronomeUI } from "./Metronome";
import { useAppDispatch, useAppSelector } from "./store";

export const Application = () => {
    const { root: metronome } = useAppSelector((state) => state.metronome);
    useAppDispatch();

    return (
        <>
            <div className="flex justify-center items-center">
                <MetronomeUI metronome={metronome} />
            </div>
        </>
    );
};
