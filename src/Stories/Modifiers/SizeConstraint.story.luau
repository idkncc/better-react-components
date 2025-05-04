local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/init")

return {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {
        MinSizeX = UILabs.Slider(100, 0, 255, 1),
        MaxSizeX = UILabs.Slider(200, 0, 500, 1),
    },
    story = function(props)
        return React.createElement(BRC.Frame, {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0.5, 0),
            BackgroundColor = "#FFF",

            MinSize = Vector2.new(props.controls.MinSizeX, 0),
            MaxSize = Vector2.new(props.controls.MaxSizeX, math.huge),
        })
    end,
}
