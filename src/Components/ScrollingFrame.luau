local GuiObjectBuilder = require("@root/Builders/GuiObjectBuilder")

local Utils = require("@root/Utils")
local Typings = require("@root/Typings")

return GuiObjectBuilder:expand(function(props: Typings.ScrollingFrameProps)
    return {
        AutomaticCanvasSize = props.AutomaticCanvasSize,
        CanvasPosition = props.CanvasPosition,
        CanvasSize = props.CanvasSize,

        ScrollingDirection = props.ScrollingDirection,
        ScrollingEnabled = props.ScrollingEnabled,

        TopImage = props.ScrollBar and props.ScrollBar.TopImage,
        MidImage = props.ScrollBar and props.ScrollBar.MidImage,
        BottomImage = props.ScrollBar and props.ScrollBar.BottomImage,

        ScrollBarImageColor3 = (props.ScrollBar and props.ScrollBar.Color)
            and Utils.ConvertColor(props.ScrollBar.Color),
        ScrollBarImageTransparency = props.ScrollBar and props.ScrollBar.Transparency,
        ScrollBarThickness = props.ScrollBar and props.ScrollBar.Thickness,

        HorizontalScrollBarInset = props.ScrollBar and props.ScrollBar.HorizontalInset,
        VerticalScrollBarInset = props.ScrollBar and props.ScrollBar.VerticalInset,
        VerticalScrollBarPosition = props.ScrollBar and props.ScrollBar.VerticalPosition,
    }, {}
end):build("ScrollingFrame")
