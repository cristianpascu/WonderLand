import "./Application.css";
import { useAppDispatch, useAppSelector } from "./store";

export const Application = () => {
    const {} = useAppSelector((state) => state);
    useAppDispatch();

    return (
        <>
            <div className="flex justify-center items-center">
                Add your component here.
            </div>
        </>
    );
};
