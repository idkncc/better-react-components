local Builder = require("@root/Builder")

export type GuiObjectProps = {
    Enabled: boolean?,
    ResetOnSpawn: boolean?,
    ZIndexBehavior: Enum.ZIndexBehavior?,
    ScreenInsets: Enum.ScreenInsets?,
    SafeAreaCompatibility: Enum.SafeAreaCompatibility?,
    DisplayOrder: number?,
}

return Builder.new(function(props: GuiObjectProps)
    return {
        Enabled = props.Enabled,
        ResetOnSpawn = props.ResetOnSpawn,
        ZIndexBehavior = props.ZIndexBehavior,
        ScreenInsets = props.ScreenInsets,
        SafeAreaCompatibility = props.SafeAreaCompatibility,
        DisplayOrder = props.DisplayOrder,
    }, {}
end)
