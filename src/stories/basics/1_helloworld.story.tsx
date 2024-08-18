import React from "@rbxts/react";

import { Text } from "../.."; // @rbxts/better-react-components
import { App } from "../App";

import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { CatppuccinLatte } from "../utils";

export = hoarcekat(() => {
    return (
        <App>
            <Text
                text="Hello world!"
                size={new UDim2(1, 0, 1, 0)}

                font={Enum.Font.BuilderSansBold} // font (Enum.Font or Font)
                textSize={48}
                borderSize={5} // border thickness

                noBackground // disable background
                textColor={CatppuccinLatte.Text}
                border={CatppuccinLatte.Base} // border color3
            />
        </App>
    );
});
