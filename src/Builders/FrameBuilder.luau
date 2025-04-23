local Packages = script.Parent.Parent.Parent

local React = require(Packages.react)
local ComponentBuilder = require(script.Parent.Parent.Builder)
local Utils = require(script.Parent.Parent.Utils)
local GuiObjectBuilder = require(script.Parent.GuiObjectBuilder)

export type FrameProps = {}

return GuiObjectBuilder -- frame doesn't add any new properties, so passthrough
