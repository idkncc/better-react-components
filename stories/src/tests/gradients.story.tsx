import React from "@rbxts/react";

import { Button, Frame, ListLayout, resolveColor3Value, Text } from "@rbxts/better-react-components";
import { App } from "../App";

import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { brighten, useMotion } from "../utils";


// bindings example:
function ButtonWithGradient() {
	const baseColor = Color3.fromHex("#ef4747");
	const [color, colorMotion] = useMotion(baseColor);

	return (
		<Button
			size={new UDim2(.5, 0, 1, 0)}
			position={UDim2.fromScale(.5, .5)}
			anchorPoint={"m"}

			cornerRadius={12}

			textColor={"#FFFFFF"}
			background={color.map((value) => [value, brighten(value, .2)])}

			event={{
				MouseButton1Down: () => colorMotion.spring(brighten(baseColor, -.25)),
				MouseButton1Up: () => colorMotion.spring(brighten(baseColor, .05)),
				MouseEnter: () => colorMotion.spring(brighten(baseColor, .05)),
				MouseLeave: () => colorMotion.spring(baseColor),
			}}

			overrideRoblox={{ AutoButtonColor: false }}
		>
			<Text
				text={"Button w/ gradient"}
				font={Enum.Font.BuilderSans}
				textSize={28}

				size={new UDim2(1, 0, 1, 0)}

				textColor={"#FFFFFF"}
				noBackground
			/>
		</Button>
	);
}

export = hoarcekat(() => {
	return (
		<App>
			<ListLayout padding={8} />

			{/* Array of colors (timed automatically) */}
			<Frame
				size={new UDim2(1, -4, 0, 75)}
				background={["#00FF00"]} // if only one color - will add second color and make UIGradient
				cornerRadius={16}
			/>

			<Text
				text={"Example text"}
				textSize={48}

				size={new UDim2(1, -4, 0, 75)}

				font={Enum.Font.BuilderSansExtraBold}

				background={"#000000"}
				backgroundTransparency={.5}

				textColor={"#FFFFFF"}
				border={["#FF0000", "#0000FF"]} // supports backgrounds and borders!
				borderSize={10}
				cornerRadius={16}
			/>

			<Frame
				size={new UDim2(1, -4, 0, 75)}
				background={["#FF0000", "#FF00FF", "#0000FF"]}
				cornerRadius={16}
			/>


			{/* Array of keypoints */}
			<Frame
				size={new UDim2(1, -4, 0, 75)}
				background={[
					new ColorSequenceKeypoint(0, resolveColor3Value("#000000") as Color3),
					new ColorSequenceKeypoint(0.5 - 0.5 / 3, resolveColor3Value("#FF0000") as Color3),
					new ColorSequenceKeypoint(0.5 + 0.5 / 3, resolveColor3Value("#FF0000") as Color3),
					new ColorSequenceKeypoint(1, resolveColor3Value("#000000") as Color3),
				]}
				cornerRadius={16}
			/>

			{/* Sequence */}
			<Frame
				size={new UDim2(1, -4, 0, 75)}
				background={new ColorSequence([
					new ColorSequenceKeypoint(0, resolveColor3Value("#FF0000") as Color3),
					new ColorSequenceKeypoint(0.5, resolveColor3Value("#3333CC") as Color3),
					new ColorSequenceKeypoint(1, resolveColor3Value("#00FF00") as Color3),
				])}
				cornerRadius={16}
			/>

			<Frame
				size={new UDim2(1, 0, 0, 75)}
				noBackground
			>
				<ButtonWithGradient />
			</Frame>
		</App>
	);
})