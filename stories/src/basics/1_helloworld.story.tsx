import React from "@rbxts/react";

import { Frame, Text } from "@rbxts/better-react-components";

import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { App } from "../App";
import { Latte } from "@rbxts/catppuccin";

export = hoarcekat(() => {
	return (
		<App>
			<Text
				text="Hello world!"
				size={new UDim2(1, 0, 1, 0)}

				font={Enum.Font.BuilderSansBold}
				textSize={48}
				borderSize={5}

				noBackground
				textColor={Latte.Text}
				border={Latte.Base}
			/>
		</App>
	);
});