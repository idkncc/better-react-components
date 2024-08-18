import React, { useBinding } from "@rbxts/react";

import { Frame, Helpers, ListLayout } from "../../index"; // @rbxts/better-react-components
import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { App } from "../App";

// const { calculateAspectRatio } = Helpers;

export = hoarcekat(() => {
    return (
        <App>
            <Frame
                anchorPoint={"m"}
                size={UDim2.fromScale(.6, .65)}
                position={UDim2.fromScale(.5, .5)}

                minSize={new Vector2(300, 300)}

                aspectRatio={1.75}
                padding={6}
            >
                <ListLayout
                    padding={6}
                    direction={"Horizontal"}
                />

                <Frame
                    background={"#c44"}
                    size={UDim2.fromScale(.2, 1)}
                    maxSize={new Vector2(150, math.huge)}
                />
                <Frame
                    background={"#4c4"}
                    size={UDim2.fromScale(0, 1)}

                    flexMode={"Fill"}
                />
            </Frame>
        </App>
    );
})
