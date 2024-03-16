import Object from "@rbxts/object-utils";
import React, { ReactNode, InstanceProps, FunctionComponent, ReactInstance } from "@rbxts/react";
import { flat } from "../utils";

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

	build(elementType: string): FunctionComponent<P> {
		return (userProps) => {
			const props: InstanceProps<I> = Object.assign(
				{},
				...this.propsBuilders
					.map((build) => build(userProps)),
			);

			const children = flat(
				this.childrenBuilders
					.map((build) => build(userProps).filterUndefined()),
			);

			return React.createElement(elementType, props, ...children);
		};
	}
}