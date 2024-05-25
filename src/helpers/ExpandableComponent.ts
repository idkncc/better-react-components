import React, { ForwardedRef, InstanceProps, ReactChild, ReactNode } from "@rbxts/react";
import Object from "@rbxts/object-utils";

import { BindingVariants as BindingVariantsUtils, flat, ReactProps } from "../utils";

/** @deprecated import from `../utils`, not from here */
export type BindingVariants<T extends object> = BindingVariantsUtils<T>

type PropBuilder<P extends object, C extends object, I extends Instance> = (userProps: BindingVariantsUtils<P>, context: C) => InstanceProps<I>
type ChildrenBuilder<P extends object, C extends object> = (userProps: BindingVariantsUtils<P>, context: C) => ReactNode[]
type ContextBuilder<P extends object, C extends object> = (userProps: BindingVariantsUtils<P>) => C

/**
 * Expandable component
 *
 * Generics:
 *  - I: instance
 *  - P: user props
 *  - C: context (passed in builders)
 */
export default class ExpandableComponent<I extends Instance, P extends object, C extends object = {}> {
	private propsBuilders: PropBuilder<P, C, I>[];
	private childrenBuilders: ChildrenBuilder<P, C>[];
	private contextBuilders: ContextBuilder<P, C>[];

	constructor(
		propsBuilders: PropBuilder<P, C, I>[] = [],
		childrenBuilders: ChildrenBuilder<P, C>[] = [],
		contextBuilders: ContextBuilder<P, C>[] = [],
	) {
		this.propsBuilders = propsBuilders;
		this.childrenBuilders = childrenBuilders;
		this.contextBuilders = contextBuilders;
	}

	expandContext<NP, NC extends object>(
		builder: ContextBuilder<P & NP, NC>,
	): ExpandableComponent<I, P & NP, C & NC> {
		return new ExpandableComponent<I, P & NP, C & NC>(
			this.propsBuilders,
			this.childrenBuilders,
			[...this.contextBuilders, builder] as ContextBuilder<P & NP, C & NC>[],
		);
	}

	expand<NI extends I = I, NP extends object = {}>(
		propBuilder?: PropBuilder<P & NP, C, NI>,
		childrenBuilder?: ChildrenBuilder<P & NP, C>,
	): ExpandableComponent<NI, P & NP, C> {
		return new ExpandableComponent<NI, P & NP, C>(
			[...this.propsBuilders, propBuilder] as PropBuilder<P & NP, C, NI>[],
			[...this.childrenBuilders, childrenBuilder] as ChildrenBuilder<P & NP, C>[],
			this.contextBuilders,
		);
	}

	build(elementType: string) {
		return React.forwardRef((userProps: BindingVariantsUtils<P & ReactProps<I>>, ref) => {
			const context = this.buildContext(userProps);
			const props = this.buildProps(userProps, context, ref);
			const children = this.buildChildren(userProps, context);

			return React.createElement(elementType, props, ...children);
		});
	}

	private buildContext(userProps: BindingVariantsUtils<P & ReactProps<I>>): C {
		return Object.assign(
			{},
			...this.contextBuilders
				.map((build) => build(userProps)),
		);
	}

	private buildProps(userProps: BindingVariantsUtils<P & ReactProps<I>>, context: C, ref: ForwardedRef<unknown>): InstanceProps<I> {
		const builtProps: InstanceProps<I>[] = [];

		for (const build of this.propsBuilders) {
			const props = build(userProps, context);
			if (props !== undefined) {
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

	private buildChildren(userProps: BindingVariantsUtils<P & ReactProps<I>>, context: C): React.ReactNode[] {
		const children = flat(
			this.childrenBuilders
				.map((build) => build(userProps, context).filterUndefined()),
		);
		if (userProps.children !== undefined) children.push(userProps.children as ReactChild);

		return children;
	}
}