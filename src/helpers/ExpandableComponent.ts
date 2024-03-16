import Object from "@rbxts/object-utils";
import React, { ReactNode, InstanceProps, FunctionComponent, ReactInstance } from "@rbxts/react";
import { flat, ReactProps } from "../utils";

type PropBuilder<P, C extends Instance> = (userProps: P) => InstanceProps<C>
type ChildrenBuilder<P> = (userProps: P) => ReactNode[]

export default class ExpandableComponent<I extends Instance, P extends object> {
	private propsBuilders: PropBuilder<P, I>[];
	private childrenBuilders: ChildrenBuilder<P>[];

	constructor(
		propsBuilders: PropBuilder<P, I>[],
		childrenBuilders: ChildrenBuilder<P>[],
	) {
		this.propsBuilders = propsBuilders;
		this.childrenBuilders = childrenBuilders;
	}

	expand<NI extends I, NP>(
		propBuilder?: PropBuilder<P & NP, NI>,
		childrenBuilder?: ChildrenBuilder<P & NP>,
	): ExpandableComponent<NI, P & NP> {
		return new ExpandableComponent<NI, P & NP>(
			[...this.propsBuilders, propBuilder] as PropBuilder<P & NP, NI>[],
			[...this.childrenBuilders, childrenBuilder] as ChildrenBuilder<P & NP>[],
		);
	}

	build(elementType: string) {
		return React.forwardRef((userProps: P & ReactProps<I>, ref) => {
			const props: InstanceProps<I> = Object.assign(
				{
					Event: userProps.event,
					Change: userProps.change,
					Tag: userProps.tag,
					ref: ref,
				},
				...this.propsBuilders
					.map((build) => build(userProps)),
			);

			const children = flat(
				this.childrenBuilders
					.map((build) => build(userProps).filterUndefined()),
			);
			if (userProps.children) children.push(userProps.children);

			return React.createElement(elementType, props, ...children);
		});
	}
}