import React, { Binding } from "@rbxts/react";

import { ColorOrHex, resolveColor3 } from "../utils";

import { BindingOrValue, getBindingValue, mapBinding } from "@rbxts/pretty-react-hooks";

export type Gradient = Array<ColorOrHex> | Array<ColorSequenceKeypoint> | ColorSequence

export function createColorSequence(value: Gradient): ColorSequence {
    if (typeIs(value, "ColorSequence")) {
        return value as ColorSequence;
    } else if (typeIs(value[0], "ColorSequenceKeypoint")) {
        return new ColorSequence(value as Array<ColorSequenceKeypoint>);
    } else {
        if (value.size() === 1) value = [value[0], value[0]];

        const keypointsCount = value.size();
        const step = 1 / (keypointsCount - 1);

        const seq: Array<ColorSequenceKeypoint> = [];
        let j = 0;
        for (let i = 0; i <= 1; i += step) {
            seq.push(new ColorSequenceKeypoint(
                i,
                getBindingValue(resolveColor3(value[j] as ColorOrHex)) ?? new Color3(),
            ));
            j++;
        }

        return new ColorSequence(seq);
    }
}

export type GradientElementProps = {
    color?: BindingOrValue<Gradient | ColorOrHex>
    rotation?: BindingOrValue<number>
}

export function getBaseColor(color: BindingOrValue<Gradient | ColorOrHex | undefined>): Binding<Color3> | undefined {
    if (typeIs(color, "nil")) return;

    return mapBinding(
        color,
        (value) =>
            typeIs(value, "string") || typeIs(value, "Color3") || typeIs(value, "nil")
                ? getBindingValue(resolveColor3(value))! // regular color
                : Color3.fromHex("#FFFFFF"), // gradient
    );
}

export function GradientElement(props: GradientElementProps) {
    const color = getBindingValue(props.color);

    return (
        !typeIs(color, "string") && !typeIs(color, "Color3") && !typeIs(color, "nil")
            // if not single color, make gradient
            ? <uigradient
                key={"_BRC_Gradient"}
                Color={mapBinding(props.color as BindingOrValue<Gradient>, createColorSequence)}
                Rotation={props.rotation}
            />
            : <></>
    );
}
