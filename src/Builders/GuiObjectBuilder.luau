local React = require("@pkg/react")
local Builder = require("@root/Builder")

local Utils = require("@root/Utils")
local Typings = require("@root/Typings")

local ListLayout = require("@root/Helpers/ListLayout")

return Builder.new(function(props: Typings.GuiObjectProps)
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

        BorderSizePixel = 0, -- we are using `UIStroke` instead.
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
        BRCListLayout = props.ListLayout and React.createElement(ListLayout, props.ListLayout),
        BRCFlexItem = props.FlexMode
            and React.createElement("UIFlexItem", { FlexMode = props.FlexMode }),
    }
end)
