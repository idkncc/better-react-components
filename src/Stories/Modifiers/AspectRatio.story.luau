local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/init")

local story = {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {
        AspectRatio = UILabs.Slider(1, 0.5, 5, 0.1),
    },
    story = function(props)
        return React.createElement(BRC.Frame, {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0.5, 0),
            BackgroundColor = "#FFF",

            Aspect = {
                Ratio = props.controls.AspectRatio, -- number
                Type = Enum.AspectType.FitWithinMaxSize,
                DominantAxis = Enum.DominantAxis.Width,
            },
        })
    end,
}

return story
