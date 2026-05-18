import AppKit
import CoreGraphics
import Foundation

let outputPath = CommandLine.arguments.count > 1
  ? CommandLine.arguments[1]
  : "/private/tmp/portfolio-og-2026.png"

let width = 2400
let height = 1260
let size = NSSize(width: width, height: height)
let image = NSImage(size: size)

func color(_ hex: UInt32, alpha: CGFloat = 1) -> NSColor {
  NSColor(
    calibratedRed: CGFloat((hex >> 16) & 0xff) / 255,
    green: CGFloat((hex >> 8) & 0xff) / 255,
    blue: CGFloat(hex & 0xff) / 255,
    alpha: alpha
  )
}

func font(_ name: String, _ size: CGFloat, _ weight: NSFont.Weight = .regular) -> NSFont {
  NSFont(name: name, size: size) ?? NSFont.systemFont(ofSize: size, weight: weight)
}

func paragraph(_ lineHeight: CGFloat, _ alignment: NSTextAlignment = .left) -> NSMutableParagraphStyle {
  let style = NSMutableParagraphStyle()
  style.minimumLineHeight = lineHeight
  style.maximumLineHeight = lineHeight
  style.alignment = alignment
  return style
}

func drawText(
  _ text: String,
  at rect: NSRect,
  font: NSFont,
  color: NSColor,
  lineHeight: CGFloat? = nil,
  kern: CGFloat = 0
) {
  let attributed = NSAttributedString(
    string: text,
    attributes: [
      .font: font,
      .foregroundColor: color,
      .kern: kern,
      .paragraphStyle: paragraph(lineHeight ?? font.pointSize * 1.15)
    ]
  )
  attributed.draw(in: rect)
}

func drawRoundedRect(_ rect: NSRect, radius: CGFloat, fill: NSColor, stroke: NSColor? = nil, lineWidth: CGFloat = 1) {
  let path = NSBezierPath(roundedRect: rect, xRadius: radius, yRadius: radius)
  fill.setFill()
  path.fill()
  if let stroke {
    stroke.setStroke()
    path.lineWidth = lineWidth
    path.stroke()
  }
}

func drawLine(from: NSPoint, to: NSPoint, color: NSColor, width: CGFloat) {
  let path = NSBezierPath()
  path.move(to: from)
  path.line(to: to)
  color.setStroke()
  path.lineWidth = width
  path.stroke()
}

image.lockFocus()

let context = NSGraphicsContext.current!.cgContext
context.setAllowsAntialiasing(true)
context.setShouldAntialias(true)

let background = NSGradient(colors: [
  color(0xf6efe2),
  color(0xe8d9bf),
  color(0xc19d63)
])!
background.draw(in: NSRect(origin: .zero, size: size), angle: 16)

let glow = NSGradient(colors: [
  color(0xfff8e6, alpha: 0.96),
  color(0xf1d193, alpha: 0.18),
  color(0xf1d193, alpha: 0)
])!
glow.draw(in: NSRect(x: 116, y: 86, width: 1180, height: 1080), relativeCenterPosition: NSPoint(x: -0.22, y: 0.2))

for index in 0..<56 {
  let x = CGFloat((index * 163) % width)
  let y = CGFloat((index * 97) % height)
  let dot = NSBezierPath(ovalIn: NSRect(x: x, y: y, width: 3, height: 3))
  color(0x7c6747, alpha: 0.09).setFill()
  dot.fill()
}

drawRoundedRect(
  NSRect(x: 100, y: 86, width: 2200, height: 1088),
  radius: 44,
  fill: color(0xfffbf1, alpha: 0.32),
  stroke: color(0x8c744e, alpha: 0.18),
  lineWidth: 2
)

let photoURL = URL(fileURLWithPath: "/Users/eun/Desktop/github/portfolio/assets/image/photo-1920.webp")
if let person = NSImage(contentsOf: photoURL) {
  let photoRect = NSRect(x: 1515, y: 66, width: 760, height: 1140)
  let clipPath = NSBezierPath(roundedRect: photoRect, xRadius: 380, yRadius: 380)
  NSGraphicsContext.saveGraphicsState()
  clipPath.addClip()
  person.draw(in: photoRect, from: .zero, operation: .sourceOver, fraction: 1)
  NSGraphicsContext.restoreGraphicsState()

  let overlay = NSGradient(colors: [
    color(0x2d2416, alpha: 0),
    color(0x2d2416, alpha: 0.22)
  ])!
  overlay.draw(in: photoRect, angle: 90)
  clipPath.lineWidth = 3
  color(0xf9edce, alpha: 0.64).setStroke()
  clipPath.stroke()
}

drawRoundedRect(
  NSRect(x: 1486, y: 122, width: 818, height: 1032),
  radius: 420,
  fill: color(0x3f3424, alpha: 0.03),
  stroke: color(0x7a633e, alpha: 0.22),
  lineWidth: 2
)

drawText(
  "EUNYOUNGHWAN PORTFOLIO",
  at: NSRect(x: 170, y: 1044, width: 760, height: 48),
  font: font("AvenirNext-DemiBold", 30, .semibold),
  color: color(0x6d5736),
  lineHeight: 36,
  kern: 4.2
)

drawText(
  "2026",
  at: NSRect(x: 170, y: 895, width: 520, height: 132),
  font: font("AvenirNext-Heavy", 122, .heavy),
  color: color(0x7d643d),
  lineHeight: 130,
  kern: -1
)

drawLine(from: NSPoint(x: 170, y: 874), to: NSPoint(x: 908, y: 874), color: color(0x88704a, alpha: 0.36), width: 3)

drawText(
  "은영환",
  at: NSRect(x: 164, y: 722, width: 960, height: 154),
  font: font("AppleSDGothicNeo-Heavy", 132, .heavy),
  color: color(0x19160f),
  lineHeight: 142,
  kern: -1
)

drawText(
  "Web Publisher",
  at: NSRect(x: 170, y: 590, width: 1120, height: 136),
  font: font("AvenirNext-Heavy", 126, .heavy),
  color: color(0x201a11),
  lineHeight: 132,
  kern: -2
)

drawText(
  "Frontend UI · Publishing",
  at: NSRect(x: 176, y: 516, width: 700, height: 48),
  font: font("AvenirNext-DemiBold", 36, .semibold),
  color: color(0x8a6b38),
  lineHeight: 44,
  kern: 0.8
)

drawText(
  "Nuxt 기반 포트폴리오 프레임워크를 중심으로\n접근성, SEO, 반응형 UI, 정적 배포 구조까지\n실무형 웹 퍼블리싱 경험을 정리했습니다.",
  at: NSRect(x: 176, y: 328, width: 905, height: 154),
  font: font("AppleSDGothicNeo-SemiBold", 38, .semibold),
  color: color(0x433624),
  lineHeight: 52,
  kern: -0.2
)

let chips = ["Nuxt 3", "Vue 3", "TypeScript", "SCSS", "Accessibility", "SEO"]
var chipX: CGFloat = 176
for chip in chips {
  let chipWidth = CGFloat(chip.count * 20 + 58)
  let rect = NSRect(x: chipX, y: 214, width: chipWidth, height: 58)
  drawRoundedRect(rect, radius: 29, fill: color(0x20180f, alpha: 0.9), stroke: color(0xf7dc9d, alpha: 0.36), lineWidth: 1.5)
  drawText(
    chip,
    at: NSRect(x: chipX + 28, y: 226, width: chipWidth - 56, height: 28),
    font: font("AvenirNext-DemiBold", 22, .semibold),
    color: color(0xfff0cf),
    lineHeight: 28,
    kern: 0.2
  )
  chipX += chipWidth + 16
}

drawText(
  "PORTFOLIO FRAMEWORK",
  at: NSRect(x: 1690, y: 122, width: 470, height: 44),
  font: font("AvenirNext-Heavy", 30, .heavy),
  color: color(0xfff1d0, alpha: 0.9),
  lineHeight: 36,
  kern: 2.8
)

image.unlockFocus()

guard
  let tiffData = image.tiffRepresentation,
  let bitmap = NSBitmapImageRep(data: tiffData),
  let pngData = bitmap.representation(using: .png, properties: [:])
else {
  fatalError("Could not render OG image.")
}

try pngData.write(to: URL(fileURLWithPath: outputPath))
