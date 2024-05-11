import { BaseComponent } from "../helpers";
import { ColorOrHex, resolveColor3 } from "../utils";
import { mapBinding } from "@rbxts/pretty-react-hooks";

export interface ImageRect {
	offset: Vector2;
	size: Vector2;
}

export interface ImageProps {
	image?: string,
	imageColor?: ColorOrHex,
	imageTransparency?: number,
	imageRect?: ImageRect
}

export const ImageComponent = BaseComponent
	.expand<ImageLabel, ImageProps>((props) => ({
		Image: props.image,
		ImageColor3: resolveColor3(props.imageColor),
		ImageTransparency: props.imageTransparency,

		ImageRectOffset: mapBinding(props.imageRect, (rect) => rect?.offset ?? new Vector2()),
		ImageRectSize: mapBinding(props.imageRect, (rect) => rect?.size ?? new Vector2()),
	}));

export const Image = ImageComponent.build("imagelabel");