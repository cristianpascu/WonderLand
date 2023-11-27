import { Square } from "./model";
import { animated, easings, useSpring } from "@react-spring/web";

export const Rectangle: React.FC<{
    square: Square;
    inside?: boolean;
    handleClick?: (square: Square) => void;
}> = ({ square, inside = false, handleClick = () => {} }) => {
    const { color: backgroundColor, leafs: children } = square;

    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: {
            easing: easings.steps(5),
        },
    });

    return (
        <div
            style={{
                maxWidth: 750,
                maxHeight: 750,
                width: inside ? "50%" : "100%",
                height: inside ? "50%" : "100%",
            }}
            className="flex flex-row flex-wrap"
        >
            {children && children.length ? (
                <>
                    {children.map((square) => (
                        <Rectangle
                            square={square}
                            inside
                            handleClick={handleClick}
                            key={square.id}
                        />
                    ))}
                </>
            ) : (
                <animated.div
                    style={{
                        backgroundColor,
                        width: "100%",
                        height: "100%",
                        ...fadeIn,
                    }}
                    className="rounded-3xl"
                    data-testid={square.id}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleClick(square);
                        return false;
                    }}
                >
                    &nbsp;
                </animated.div>
            )}
        </div>
    );
};
