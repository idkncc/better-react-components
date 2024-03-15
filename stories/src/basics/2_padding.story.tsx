import React from "@rbxts/react";

import { AnchorPoints, Frame, Text } from "@rbxts/better-react-components";

import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { App } from "../App";

export = hoarcekat(() => {
	return (
		<App>
			<Text
				text={"red - parent\nblue - available space"}

				size={UDim2.fromScale(.25, 1)}

				textColor={"#FFFFFF"}
				background={"#000000"}
				backgroundTransparency={.75}
			/>

			<Frame
				position={new UDim2(.5, 0, .5, 0)} // set position to the center
				size={new UDim2(.75, 0, .75, 0)} // make it 75% of height and width
				aspectRatio={1} // and to make a square, use aspect ratio
				anchorPoint={AnchorPoints.Middle} // anchor point in the center

				background={"#FF0000"}

				padding={8} // PADDING
			>
				<Text
					text="available space"
					size={UDim2.fromScale(1, 1)}

					font={Enum.Font.BuilderSansBold}
					textSize={32}

					background={Color3.fromHex("#0000FF")}
					textColor={Color3.fromHex("#FFFFFF")}
				/>
			</Frame>
		</App>
	);
});