local Packages = script.Parent.Parent

local React = require(Packages.react)
local Utils = require(script.Parent.Utils)

local ComponentBuilder = {}
ComponentBuilder.__index = ComponentBuilder

--- Transformer is a function, that transforms user-friendly props to component props and children nodes
export type Transformer<P, OP> = (props: P) -> (OP, { React.ReactNode })

export type ComponentBuilderData<P, OP> = {
    transformer: Transformer<P, OP>,
}

export type ComponentBuilder<P, OP> = typeof(setmetatable(
    {} :: ComponentBuilderData<P, OP>,
    ComponentBuilder
))

function ComponentBuilder.new<P, OP>(transformer: Transformer<P, OP>): ComponentBuilder<P, OP>
    local self = {
        transformer = transformer,
    }

    return setmetatable(self, ComponentBuilder)
end

--- Expand
function ComponentBuilder.expand<P, OP, NP, NOP>(
    self: ComponentBuilder<P, OP>,
    transformer: Transformer<NP, NOP>
): ComponentBuilder<P & NP, OP & NOP>
    return ComponentBuilder.new(function(props: P & NP)
        local rbxProps, rbxChildren = self.transformer(props)
        local rbxProps2, rbxChildren2 = transformer(props)

        return Utils.Assign(rbxProps, rbxProps2), Utils.Assign(rbxChildren, rbxChildren2)
    end)
end

function ComponentBuilder.build<P, OP>(
    self: ComponentBuilder<P, OP>,
    robloxComponent: string
): (props: P) -> any
    return React.forwardRef(function(props: React.ElementProps<string> & P)
        local outputProps, outputChildren = self.transformer(props)

        return React.createElement(robloxComponent, outputProps, outputChildren, props.children)
    end)
end
return ComponentBuilder
