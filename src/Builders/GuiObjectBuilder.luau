local React = require("@pkg/react")
local Builder = require("../Builder")
local Utils = require("../Utils")

--- Border settings
---
--- NOTE: when building, it uses `UIStroke`, instead of `GuiObject`'s border properties
export type Border = {
    Color: Utils.Color?,
    Thickness: number?,
    LineJoinMode: Enum.LineJoinMode,
    Transparency: number?,
}

export type Aspect = {
    Ratio: number,
    Type: Enum.AspectType?,
    DominantAxis: Enum.DominantAxis?,
}

export type GuiObjectProps = {
    AnchorPoint: Utils.AnchorPoint?,
    AutomaticSize: Enum.AutomaticSize?,
    BackgroundColor: Utils.Color?,
    BackgroundTransparency: number?,

    --- Alias for `BackgroundTransparency = 1`
    NoBackground: boolean?,

    Position: UDim2?,
    Size: UDim2?,

    SizeConstraint: Enum.SizeConstraint?,
    Visible: boolean?,

    LayoutOrder: number?,
    ZIndex: number?,

    Border: Border?,
    CornerRadius: Utils.UDimValue?,

    Aspect: Aspect?,

    Padding: Utils.PaddingValue?,

    MinSize: Vector2,
    MaxSize: Vector2,
}

return Builder.new(function(props: GuiObjectProps)
    return {
        AnchorPoint = props.AnchorPoint and Utils.ConvertAnchorPoint(props.AnchorPoint),
        AutomaticSize = props.AutomaticSize,

        BackgroundColor3 = props.BackgroundColor and Utils.ConvertColor(props.BackgroundColor),
        BackgroundTransparency = props.NoBackground and 1 or props.BackgroundTransparency,

        Position = props.Position,
        Size = props.Size,

        SizeConstraint = props.SizeConstraint,
        LayoutOrder = props.LayoutOrder,
        ZIndex = props.ZIndex,
    }, {
        BRCBorder = props.Border and React.createElement("UIStroke", {
            Color = props.Border.Color and Utils.ConvertColor(props.Border.Color),
            Thickness = props.Border.Thickness,
            LineJoinMode = props.Border.LineJoinMode,
            Transparency = props.Border.Transparency,
        }),
        BRCCorner = props.CornerRadius and React.createElement("UICorner", {
            CornerRadius = Utils.ConvertUDim(props.CornerRadius),
        }),
        BRCAspectRatio = props.Aspect and React.createElement("UIAspectRatioConstraint", {
            AspectRatio = props.Aspect.Ratio,
            AspectType = props.Aspect.Type,
            DominantAxis = props.Aspect.DominantAxis,
        }),
        BRCPadding = props.Padding
            and React.createElement("UIPadding", Utils.ConvertPadding(props.Padding):getValue()),

        BRCSizeConstraint = (props.MinSize ~= nil or props.MaxSize ~= nil)
            and React.createElement("UISizeConstraint", {
                MinSize = props.MinSize,
                MaxSize = props.MaxSize,
            }),
    }
end)
