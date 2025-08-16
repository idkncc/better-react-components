local React = require("@pkg/react")

--- User-friendly anchor points
---
---       center
--- left  |    right
--- |     |    |
--- `tl`, `t`, `tr` – top
--- `ml`, `m`, `mr` – middle
--- `bl`, `b`, `br` – bottom
export type AnchorPoint = "tl" | "t" | "tr" | "ml" | "m" | "mr" | "bl" | "b" | "br" | Vector2

--- Color
---
--- It's either `Color3` or hexcode of color (e.g. `#FF0000`)
export type Color = Color3 | string

--- Text Size
---
--- `"auto"` enables `TextScaled` property. Otherwise sets TextSize
export type TextSize = number | "auto"

--- Font
export type FontValue = Font | EnumItem

--- UDim
---
--- Takes `UDim` or `number` as offset
export type UDimValue = UDim | number

--- Padding (like in CSS)
---
--- There's 3 scenarios
---  1. Value is `UDimValue` or `{UDimValue}`: padding `UDimValue` is applied to all sides
---  2. Value is `{UDimValue, UDimValue}`: first value is vertical padding, second - horizontal padding
---  3. Value is `{UDimValue, UDimValue, UDimValue}`: where each value is {Top, Horizontal, Bottom}
---  4. Value is `{UDimValue, UDimValue, UDimValue, UDimValue}`: where each value is {Top, Right, Bottom, Left}
export type PaddingValue = UDimValue | { UDimValue }

export type BindingOrValue<T> = React.Binding<T> | T

export type FlexAlignment =
    "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch"

export type ScreenGuiProps = {
    Enabled: boolean?,
    ResetOnSpawn: boolean?,
    ZIndexBehavior: Enum.ZIndexBehavior?,
    ScreenInsets: Enum.ScreenInsets?,
    SafeAreaCompatibility: Enum.SafeAreaCompatibility?,
    DisplayOrder: number?,
}

--- Border settings
---
--- NOTE: when building, it uses `UIStroke`, instead of `GuiObject`'s border properties
export type Border = {
    Color: Color?,
    Thickness: number?,
    LineJoinMode: Enum.LineJoinMode,
    Transparency: number?,
}

export type Aspect = {
    Ratio: number,
    Type: Enum.AspectType?,
    DominantAxis: Enum.DominantAxis?,
}

export type ListLayoutProps = {
    Gap: UDimValue,

    Direction: Enum.FillDirection?,
    Order: Enum.SortOrder?,
    Wraps: boolean?,

    JustifyContent: FlexAlignment?,
    AlignItems: FlexAlignment?,
    -- TODO: ItemLineAlignment
}

export type GuiObjectModifiers = {
    CornerRadius: UDimValue?,

    Aspect: Aspect?,

    Padding: PaddingValue?,

    MinSize: Vector2?,
    MaxSize: Vector2?,

    ListLayout: ListLayoutProps?,
    FlexMode: Enum.UIFlexMode?,
}

export type GuiObjectProps = {
    Active: boolean,

    AnchorPoint: AnchorPoint?,
    AutomaticSize: Enum.AutomaticSize?,

    BackgroundColor: Color?,
    BackgroundTransparency: number?,
    --- Alias for `BackgroundTransparency = 1`
    NoBackground: boolean?,

    Border: Border?,

    ClipsDescendants: boolean?,
    -- TODO: GuiState:Enum.GuiState,
    Interactable: boolean,

    LayoutOrder: number?,

    -- TODO: NextSelectionDown:GuiObject
    -- TODO: NextSelectionLeft:GuiObject
    -- TODO: NextSelectionRight:GuiObject
    -- TODO: NextSelectionUp:GuiObject

    Position: UDim2?,
    Rotation: number?,

    Selectable: boolean?,
    -- TODO: SelectionImageObject:GuiObject,
    -- TODO: SelectionOrder:number

    Size: UDim2?,
    SizeConstraint: Enum.SizeConstraint?,

    Transparency: number,
    Visible: boolean?,

    ZIndex: number?,
} & GuiObjectModifiers

export type TextProps = {
    Text: string?,

    Font: FontValue?,
    LineHeight: number?,
    RichText: boolean?,
    TextColor: Color?,
    TextSize: TextSize?,
    TextWrapped: boolean?,

    TextXAlignment: Enum.TextXAlignment?,
    TextYAlignment: Enum.TextYAlignment?,

    MinTextSize: number,
    MaxTextSize: number,
}

export type TextButtonProps = {
    Style: Enum.ButtonStyle?,
    AutoButtonColor: boolean?,
    Modal: boolean?,
}

export type ScrollingFrameScrollBar = {
    TopImage: string?,
    MidImage: string?,
    BottomImage: string?,

    Color: Color,
    Transparency: number?,

    Thickness: number?,
    HorizontalInset: Enum.ScrollBarInset?,
    VerticalInset: Enum.ScrollBarInset?,
    VerticalPosition: Enum.VerticalScrollBarPosition?,
}

export type ScrollingFrameProps = {
    AutomaticCanvasSize: Enum.AutomaticSize?,
    CanvasPosition: Vector2?,
    CanvasSize: UDim2?,

    ScrollingDirection: Enum.ScrollingDirection?,
    ScrollingEnabled: boolean?,

    ScrollBar: ScrollingFrameScrollBar?,
}

return {}
