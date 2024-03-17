import Object from "@rbxts/object-utils";
import React, {
	ReactNode,
	InstanceProps,
	FunctionComponent,
	ReactInstance,
	AllowRefs,
	InferEnumNames, Binding,
} from "@rbxts/react";
import { flat, ReactProps } from "../utils";

type PropBuilder<P extends object, C extends Instance> = (userProps: BindingVariants<P>) => InstanceProps<C>
type ChildrenBuilder<P extends object> = (userProps: BindingVariants<P>) => ReactNode[]

export type BindingVariants<T extends object> = {
	[P in keyof T]?:
	| T[P]
	| InferEnumNames<T[P]>
	| Binding<Exclude<T[P], undefined>>;
};

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
		return React.forwardRef((userProps: BindingVariants<P & ReactProps<I>>, ref) => {
			const props: InstanceProps<I> = Object.assign(
				Object.assign({},
					...this.propsBuilders
						.map((build) => build(userProps)),
				),
				{
					Event: userProps.event,
					Change: userProps.change,
					Tag: userProps.tag,
					ref: ref,
				},
				userProps.overrideRoblox as object,
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