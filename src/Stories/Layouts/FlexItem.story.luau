local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/init")

local FlexAlignmentValues = {
    Start = "start",
    End = "end",
    Center = "center",
    SpaceBetween = "space-between",
    SpaceAround = "space-around",
    SpaceEvenly = "space-evenly",
    Stretch = "stretch",
}

return {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {
        ParentSizePercent = UILabs.Slider(70, 0, 100, 1),
    },
    story = function(props)
        return React.createElement(BRC.Frame, {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(props.controls.ParentSizePercent / 100, 0, 0.25, 0),
            BackgroundColor = "#FFF",

            Padding = props.controls.Gap,
            ListLayout = {
                Gap = props.controls.Gap,
                Direction = Enum.FillDirection.Horizontal,
            },
        }, {
            React.createElement(BRC.TextLabel, {
                Size = UDim2.new(0.5, 0, 1, 0),
                BackgroundColor = "#E80000",
                Text = "This component has SizeX = {0.5, 0} (NOTE: Scale units), FlexMode = Fill",
                TextWrapped = true,

                TextSize = 10,

                FlexMode = Enum.UIFlexMode.Fill,
            }),
            React.createElement(BRC.TextLabel, {
                Size = UDim2.new(0, 300, 1, 0),
                BackgroundColor = "#080808",
                TextColor = "#FFFFFF",

                Text = "But this component has SizeX = {0, 300} (NOTE: Offset units). Without FlexMode, this would be painful to recreate",
                TextWrapped = true,
                TextSize = 10,
            }),
        })
    end,
}
