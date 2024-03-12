import React from "@rbxts/react";

import { Button, Frame, ListLayout } from "@rbxts/better-react-components";

import { Latte } from "@rbxts/catppuccin";

export function Sidebar() {
	return (
		<Frame
			position={new UDim2(0, 8, .5, 0)}
			size={new UDim2(.25, 0, .5, 0)}
			anchorPoint={"ml"} // middle-left

			background={Latte.Base}

			cornerRadius={16}
			padding={4}
			minSize={new Vector2(50, 0)}
			maxSize={new Vector2(150, math.huge)}

			automaticSize={"Y"}
		>
			<ListLayout padding={4} direction={Enum.FillDirection.Vertical} />

			<Button
				cornerRadius={12}

				aspectRatio={1}
				position={UDim2.fromOffset(0, 0)} size={new UDim2(1, 0, 1, 0)}

				background={Latte.Mantle}
				textColor={Latte.Text}
				text="Test 1"

				event={{
					Activated: () => print("activated!"),
				}}
			/>

			<Button
				cornerRadius={12}

				aspectRatio={1}
				position={UDim2.fromOffset(0, 0)} size={new UDim2(1, 0, 1, 0)}

				background={Latte.Mantle}
				textColor={Latte.Text}
				text="Test 2"
			/>

			<Button
				cornerRadius={12}

				aspectRatio={1}
				position={UDim2.fromOffset(0, 0)} size={new UDim2(1, 0, 1, 0)}

				background={Latte.Mantle}
				textColor={Latte.Text}
				text="Test 3"
			/>
		</Frame>
	);
}