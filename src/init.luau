local Typings = require("@root/Typings")

-- reexports of typings:
export type AnchorPoint = Typings.AnchorPoint
export type Color = Typings.Color
export type TextSize = Typings.TextSize
export type FontValue = Typings.FontValue
export type UDimValue = Typings.UDimValue
export type PaddingValue = Typings.PaddingValue
export type FlexAlignment = Typings.FlexAlignment
export type BindingOrValue<T> = Typings.BindingOrValue<T>

export type BorderSettings = Typings.BorderSettings
export type AspectSettings = Typings.AspectSettings
export type ListLayoutSettings = Typings.ListLayoutSettings
export type GuiObjectModifiers = Typings.GuiObjectModifiers

export type GuiObjectProps = Typings.GuiObjectProps
export type ScreenGuiProps = Typings.ScreenGuiProps
export type TextProps = Typings.TextProps
export type TextButtonProps = Typings.TextButtonProps
export type ScrollingFrameScrollBar = Typings.ScrollingFrameScrollBar
export type ScrollingFrameProps = Typings.ScrollingFrameProps

local BetterReactComponents = {
    Utils = require("@root/Utils"),
    Builder = require("@root/Builder"),
}

local Components = require("@root/Components")
local Builders = require("@root/Builders")

return BetterReactComponents.Utils.Assign(
    BetterReactComponents.Utils.Assign(BetterReactComponents, Components),
    Builders
)
