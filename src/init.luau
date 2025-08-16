local Typings = require("@root/Typings")

-- reexports of typings:
export type Color = Typings.Color
export type TextSize = Typings.TextSize
export type UDimValue = Typings.UDimValue
export type FontValue = Typings.FontValue
export type AnchorPoint = Typings.AnchorPoint
export type PaddingValue = Typings.PaddingValue
export type FlexAlignment = Typings.FlexAlignment
export type BindingOrValue<T> = Typings.BindingOrValue<T>

export type Aspect = Typings.Aspect
export type Border = Typings.Border
export type GuiObjectProps = Typings.GuiObjectProps
export type ScreenGuiProps = Typings.ScreenGuiProps
export type TextButtonProps = Typings.TextButtonProps
export type ListLayoutProps = Typings.ListLayoutProps
export type ScrollingFrameProps = Typings.ScrollingFrameProps
export type ScrollingFrameScrollBar = Typings.ScrollingFrameScrollBar

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
