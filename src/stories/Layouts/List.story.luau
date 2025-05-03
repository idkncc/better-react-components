local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local Frame = require("../..").Frame

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
        Gap = UILabs.Slider(0, 0, 24, 1),
        JustifyContent = UILabs.EnumList(FlexAlignmentValues, "Center"),
        AlignItems = UILabs.EnumList(FlexAlignmentValues, "Center"),
    },
    story = function(props)
        return React.createElement(Frame, {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0.75, 0),
            BackgroundColor = "#FFF",

            Padding = props.controls.Gap,
            ListLayout = {
                -- JustifyContent is alignment at main axis
                -- AlignItems is alignment at cross axis

                Gap = props.controls.Gap,
                JustifyContent = props.controls.JustifyContent, -- CSS like values: start, end, center, space-between, space-around, space-evenly and stretch
                AlignItems = props.controls.AlignItems, -- same as above
            },
        }, {
            React.createElement(
                Frame,
                { Size = UDim2.new(0.5, 0, 0.25, 0), BackgroundColor = "#E80000" }
            ),
            React.createElement(
                Frame,
                { Size = UDim2.new(0.5, 0, 0.25, 0), BackgroundColor = "#00E800" }
            ),
            React.createElement(
                Frame,
                { Size = UDim2.new(0.5, 0, 0.25, 0), BackgroundColor = "#0000E8" }
            ),
        })
    end,
}
