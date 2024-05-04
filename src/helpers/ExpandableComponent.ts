import React, { ForwardedRef, InstanceProps, ReactChild, ReactNode } from "@rbxts/react";
import Object from "@rbxts/object-utils";

import { BindingVariants as BindingVariantsUtils, flat, ReactProps } from "../utils";

/** @deprecated import from `../utils`, not from here */
export type BindingVariants<T extends object> = BindingVariantsUtils<T>

type PropBuilder<P extends object, C extends Instance> = (userProps: BindingVariantsUtils<P>) => InstanceProps<C>
type ChildrenBuilder<P extends object> = (userProps: BindingVariantsUtils<P>) => ReactNode[]

export default class ExpandableComponent<I extends Instance, P extends object> {
	private propsBuilders: PropBuilder<P, I>[];
	private childrenBuilders: ChildrenBuilder<P>[];

	constructor(
		propsBuilders: PropBuilder<P, I>[] = [],
		childrenBuilders: ChildrenBuilder<P>[] = [],
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
		return React.forwardRef((userProps: BindingVariantsUtils<P & ReactProps<I>>, ref) => {
			const props = this.buildProps(userProps, ref);
			const children = this.buildChildren(userProps);

			return React.createElement(elementType, props, ...children);
		});
	}

	buildProps(userProps: BindingVariantsUtils<P & ReactProps<I>>, ref: ForwardedRef<unknown>): InstanceProps<I> {
		const builtProps: InstanceProps<I>[] = [];

		for (const build of this.propsBuilders) {
			const props = build(userProps);
			if (props) {
				builtProps.push(props);
			}
		}

		return Object.assign(
			Object.assign(
				{},
				...builtProps,
			),
			{
				Event: userProps.event,
				Change: userProps.change,
				Tag: userProps.tag,
				ref: ref,
			},
			userProps.overrideRoblox as object,
		);
	}

	buildChildren(userProps: BindingVariantsUtils<P & ReactProps<I>>): React.ReactNode[] {
		const children = flat(
			this.childrenBuilders
				.map((build) => build(userProps).filterUndefined()),
		);
		if (userProps.children) children.push(userProps.children as ReactChild);

		return children;
	}
}