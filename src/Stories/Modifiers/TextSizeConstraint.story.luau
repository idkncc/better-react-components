local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/init")

return {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {
        SizeY = UILabs.Slider(100, 0, 500),
        MaxTextSize = UILabs.Slider(20, 1, 100),
    },
    story = function(props)
        return React.createElement(BRC.TextLabel, {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0, props.controls.SizeY),
            BackgroundColor = "#FFF",
            TextColor = "#F00",

            Text = "creepy ahh text",
            TextSize = "auto",
            Font = Enum.Font.Creepster,

            MaxTextSize = props.controls.MaxTextSize,
        })
    end,
}
