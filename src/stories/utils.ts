import { useEventListener } from "@rbxts/pretty-react-hooks";
import { createMotion, Motion, MotionGoal } from "@rbxts/ripple";
import { Binding, useBinding, useMemo } from "@rbxts/react";
import { RunService } from "@rbxts/services";

export function useMotion(initialValue: number): LuaTuple<[Binding<number>, Motion]>;

export function useMotion<T extends MotionGoal>(initialValue: T): LuaTuple<[Binding<T>, Motion<T>]>;

export function useMotion<T extends MotionGoal>(initialValue: T) {
	const motion = useMemo(() => {
		return createMotion(initialValue);
	}, []);

	const [binding, setValue] = useBinding(initialValue);

	useEventListener(RunService.Heartbeat, (delta) => {
		const value = motion.step(delta);

		if (value !== binding.getValue()) {
			setValue(value);
		}
	});

	return $tuple(binding, motion);
}


/**
 * @param color The color to brighten or darken
 * @param brightness The amount to brighten or darken the color
 * @param vibrancy How much saturation changes with brightness
 */
export function brighten(color: Color3, brightness: number, vibrancy = 0.5) {
	const [h, s, v] = color.ToHSV();
	return Color3.fromHSV(h, math.clamp(s - brightness * vibrancy, 0, 1), math.clamp(v + brightness, 0, 1));
}

export const CatppuccinLatte = {
	Rosewater: new Color3(0.862745, 0.541176, 0.470588),
	Flamingo: new Color3(0.866667, 0.470588, 0.470588),
	Pink: new Color3(0.917647, 0.462745, 0.796078),
	Mauve: new Color3(0.533333, 0.223529, 0.937255),
	Red: new Color3(0.823529, 0.0588235, 0.223529),
	Maroon: new Color3(0.901961, 0.270588, 0.32549),
	Peach: new Color3(0.996078, 0.392157, 0.0431373),
	Yellow: new Color3(0.87451, 0.556863, 0.113725),
	Green: new Color3(0.25098, 0.627451, 0.168627),
	Teal: new Color3(0.0901961, 0.572549, 0.6),
	Sky: new Color3(0.0156863, 0.647059, 0.898039),
	Sapphire: new Color3(0.12549, 0.623529, 0.709804),
	Blue: new Color3(0.117647, 0.4, 0.960784),
	Lavender: new Color3(0.447059, 0.529412, 0.992157),
	Text: new Color3(0.298039, 0.309804, 0.411765),
	Subtext1: new Color3(0.360784, 0.372549, 0.466667),
	Subtext0: new Color3(0.423529, 0.435294, 0.521569),
	Overlay2: new Color3(0.486275, 0.498039, 0.576471),
	Overlay1: new Color3(0.54902, 0.560784, 0.631373),
	Overlay0: new Color3(0.611765, 0.627451, 0.690196),
	Surface2: new Color3(0.67451, 0.690196, 0.745098),
	Surface1: new Color3(0.737255, 0.752941, 0.8),
	Surface0: new Color3(0.8, 0.815686, 0.854902),
	Base: new Color3(0.937255, 0.945098, 0.960784),
	Mantle: new Color3(0.901961, 0.913725, 0.937255),
	Crust: new Color3(0.862745, 0.878431, 0.909804),
};