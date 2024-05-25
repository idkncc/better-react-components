import React from "@rbxts/react";

import { AnchorPoints, Button, Frame, ListLayout } from "../.."; // @rbxts/better-react-components
import { App } from "../App";

import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { CatppuccinLatte } from "../utils";

function CoolButton(props: { text: string, onClick: () => void }) {
	return (
		<Button
			text={props.text}
			size={new UDim2(1, 0, 1, 0)}
			aspectRatio={1}

			// to make it beautiful
			// parent_corner_radius - parent_padding = child_corner_radius
			cornerRadius={12 - 6}

			font={Enum.Font.BuilderSansBold}
			textSize={14}

			background={CatppuccinLatte.Mantle}
			textColor={CatppuccinLatte.Text}

			event={{
				Activated: props.onClick,
			}}
		/>
	);
}

export = hoarcekat(() => {
	return (
		<App>
			<Frame
				position={new UDim2(0, 8, 0.5, 0)}
				anchorPoint={AnchorPoints.MiddleLeft}

				size={new UDim2(0, 100, 0, 0)}
				automaticSize={"Y"}

				background={CatppuccinLatte.Base}
				padding={6}

				cornerRadius={12}
			>
				<ListLayout padding={6} />

				<CoolButton
					text={"First button"}
					onClick={() => print("Clicked on button #1")}
				/>

				<CoolButton
					text={"Second button"}
					onClick={() => print("Clicked on button #2")}
				/>

				<CoolButton
					text={"Third button"}
					onClick={() => print("Clicked on button #3")}
				/>
			</Frame>
		</App>
	);
});