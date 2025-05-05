local Builder = require("@root/Builder")
local Typings = require("@root/Typings")

return Builder.new(function(props: Typings.ScreenGuiProps)
    return {
        Enabled = props.Enabled,
        ResetOnSpawn = props.ResetOnSpawn,
        ZIndexBehavior = props.ZIndexBehavior,
        ScreenInsets = props.ScreenInsets,
        SafeAreaCompatibility = props.SafeAreaCompatibility,
        DisplayOrder = props.DisplayOrder,
    }, {}
end):build("ScreenGui")
