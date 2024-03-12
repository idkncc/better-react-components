import { BaseProps, expandBase } from "../expandBase";

export type FrameProps = BaseProps<Frame>

export function Frame(props: FrameProps) {
	return expandBase<Frame>("frame", {}, props)
}
