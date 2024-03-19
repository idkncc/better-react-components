// tl t tr
// cl c cr
// bl b br
import {
	Binding,
	InstanceChangeEvent,
	InstanceEvent,
	InstanceProps,
	Key,
	ReactNode,
	Ref,
	RefObject,
} from "@rbxts/react";

import { BindingOrValue, isBinding, mapBinding } from "@rbxts/pretty-react-hooks";

export type ReactProps<T extends Instance> = {
	key?: Key;
	ref?: RefObject<T>;
	children?: ReactNode;
	event?: InstanceEvent<T>;
	change?: InstanceChangeEvent<T>;
	tag?: string;

	overrideRoblox?: InstanceProps<T>
}

export type AnchorPointsVariant =
	"tl" | "t" | "tr" |
	"ml" | "m" | "mr" |
	"bl" | "b" | "br"

export type ColorOrHex = Color3 | string

export enum AnchorPoints {
	TopLeft = "tl",
	Top = "t",
	TopRight = "tr",
	MiddleLeft = "ml",
	Middle = "m",
	MiddleRight = "mr",
	BottomLeft = "bl",
	Bottom = "b",
	BottomRight = "br",
}

export type ResolvableAnchorPoint =
	Vector2 | AnchorPointsVariant | AnchorPoints

export function resolveAnchorPoint(value: BindingOrValue<ResolvableAnchorPoint>): BindingOrValue<Vector2> {
	return mapBinding(value, (value) => {
		if (typeIs(value, "Vector2")) return value;

		switch (value) {
			case AnchorPoints.TopLeft:
				return new Vector2(0, 0);
			case AnchorPoints.Top:
				return new Vector2(.5, 0);
			case AnchorPoints.TopRight:
				return new Vector2(1, 0);
			case AnchorPoints.MiddleLeft:
				return new Vector2(0, .5);
			case AnchorPoints.Middle:
				return new Vector2(.5, .5);
			case AnchorPoints.MiddleRight:
				return new Vector2(1, .5);
			case AnchorPoints.BottomLeft:
				return new Vector2(0, 1);
			case AnchorPoints.Bottom:
				return new Vector2(.5, 1);
			case AnchorPoints.BottomRight:
				return new Vector2(1, 1);

			default:
				return new Vector2(0, 0);
		}
	});
}

export function resolveUDim(value: BindingOrValue<number | UDim>): BindingOrValue<UDim> {
	return mapBinding(value, (value) => {
		if (typeIs(value, "UDim")) return value;
		return new UDim(0, value);
	});
}
export function resolveColor3Value(value: ColorOrHex): Color3 {
	if (typeIs(value, "Color3")) return value;
	return Color3.fromHex(value);
}

export function resolveColor3(value: BindingOrValue<ColorOrHex> | undefined): Binding<Color3> | undefined {
	if (!value) return undefined;

	return mapBinding(value, (value) => {
		if (typeIs(value, "Color3")) return value;
		return Color3.fromHex(value);
	});
}

/**
 * @deprecated Use `mapBinding` from `@rbxts/pretty-react-hooks`. Probably will be removed later.
 */
export function resolveBinding<T, R>(bindingOrValue: BindingOrValue<T> | undefined, callback: (value: T) => R): BindingOrValue<R> | undefined {
	if (!bindingOrValue) return;

	if (isBinding(bindingOrValue)) {
		return bindingOrValue.map(callback);
	} else {
		return callback(bindingOrValue);
	}
}

export function flat<T>(arr: T[][]): T[] {
	const newArr: defined[] = [];

	for (const [_, v] of ipairs(arr)) {
		for (const [_, value] of ipairs(v)) {
			newArr.push(value as unknown as defined);
		}
	}

	return newArr as T[];
}