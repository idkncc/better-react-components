import React from "@rbxts/react";

import { Button, Frame, Text } from "@rbxts/better-react-components";

import { Latte } from "@rbxts/catppuccin";

export function Somemenu() {
	return (
		<Frame
			position={new UDim2(.5, 8, .5, 0)}
			size={new UDim2(.5, 0, .5, 0)}
			anchorPoint={"m"} // middle (center)

			noBackground // just one modifier
			// instead of: backgroundTransparency={1}
		>
			<Text
				position={new UDim2()}
				size={new UDim2(1, 0, 0, 100)}

				text="Somemenu example"
				textSize={32}
				font={Enum.Font.BuilderSans}
			/>
		</Frame>
	);
}