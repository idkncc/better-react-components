// tl t tr
// cl c cr
// bl b br
import { InstanceChangeEvent, InstanceEvent, InstanceProps, Key, ReactNode, Ref, RefObject } from "@rbxts/react";

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

export function resolveAnchorPoint(value: ResolvableAnchorPoint): Vector2 {
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
}

export function resolveUDim(value: number | UDim): UDim {
	if (typeIs(value, "UDim")) return value;
	return new UDim(0, value);
}

export function resolveColor3(value: string | Color3 | undefined): Color3 | undefined {
	if (!value) return undefined;

	if (typeIs(value, "Color3")) return value;
	return Color3.fromHex(value);
}

export function omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
	for (const [_, key] of ipairs(keys)) {
		delete obj[key];
	}

	return obj as Omit<T, K>;
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