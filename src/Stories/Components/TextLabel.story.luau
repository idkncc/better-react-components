local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/init")

local Fonts = {}
for _, font in pairs(Enum.Font:GetEnumItems()) do
    Fonts[tostring(font):gsub("Enum.Font.", "")] = font
end

print(Fonts)

return {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {
        Text = "Hello, world!",
        Font = UILabs.EnumList(Fonts, "Arimo"),
        TextColor = Color3.fromHex("#FFFFFF"),
        BackgroundColor = Color3.fromHex("#CC0000"),
        CornerRadius = 0,
    },
    story = function(props)
        return React.createElement(BRC.TextLabel, {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0.5, 0),
            BackgroundColor = props.controls.BackgroundColor,

            Font = Font.fromEnum(props.controls.Font),
            TextColor = props.controls.TextColor,
            TextSize = 24,
            Text = props.controls.Text,
        })
    end,
}
