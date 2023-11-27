import "./Application.css";
import { Rectangle } from "./Rectangle";
import { split, useAppDispatch, useAppSelector } from "./store";

export const Application = () => {
    const { root } = useAppSelector((state) => state.square);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="flex justify-center items-center">
                <Rectangle
                    square={root}
                    handleClick={(square) => {
                        dispatch(split(square));
                    }}
                />
            </div>
        </>
    );
};
