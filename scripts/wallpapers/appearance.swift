// Packages existing artwork with macOS appearance metadata using Apple's ImageIO.
// Format reference: https://github.com/mczachurski/wallpapper (apple_desktop:apr).
import Foundation
import ImageIO
import UniformTypeIdentifiers

struct Appearance: Codable, Equatable {
    let l: Int
    let d: Int
}
struct Failure: Error, CustomStringConvertible {
    let description: String
}
func require(_ condition: Bool, _ message: String) throws {
    if !condition { throw Failure(description: message) }
}
func load(_ path: String) throws -> CGImageSource {
    guard let source = CGImageSourceCreateWithURL(URL(fileURLWithPath: path) as CFURL, nil) else {
        throw Failure(description: "Cannot read image: \(path)")
    }
    return source
}
func image(_ source: CGImageSource, _ index: Int) throws -> CGImage {
    guard let image = CGImageSourceCreateImageAtIndex(source, index, nil) else {
        throw Failure(description: "Cannot decode image at index \(index)")
    }
    return image
}
func pixels(_ image: CGImage) throws -> [UInt8] {
    var bytes = [UInt8](repeating: 0, count: 32 * 32 * 4)
    try bytes.withUnsafeMutableBytes { buffer in
        guard let context = CGContext(data: buffer.baseAddress, width: 32, height: 32,
                                      bitsPerComponent: 8, bytesPerRow: 32 * 4,
                                      space: CGColorSpaceCreateDeviceRGB(),
                                      bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else {
            throw Failure(description: "Cannot create image validation context")
        }
        context.draw(image, in: CGRect(x: 0, y: 0, width: 32, height: 32))
    }
    return bytes
}
func validate(_ path: String, light: CGImage, dark: CGImage) throws {
    let source = try load(path)
    try require(CGImageSourceGetType(source) as String? == UTType.heic.identifier, "Expected HEIC")
    try require(CGImageSourceGetCount(source) == 2, "Expected two appearance images")
    guard let metadata = CGImageSourceCopyMetadataAtIndex(source, 0, nil),
          let value = CGImageMetadataCopyStringValueWithPath(metadata, nil, "apple_desktop:apr" as CFString),
          let data = Data(base64Encoded: value as String) else {
        throw Failure(description: "Missing appearance metadata")
    }
    let mapping = try PropertyListDecoder().decode(Appearance.self, from: data)
    try require(mapping == Appearance(l: 0, d: 1), "Incorrect appearance mapping")
    for (index, original) in [light, dark].enumerated() {
        let frame = try image(source, index)
        try require(frame.width == original.width && frame.height == original.height, "Image dimensions changed")
        let expected = try pixels(original)
        let actual = try pixels(frame)
        let averageError = zip(expected, actual).reduce(0.0) { $0 + abs(Double($1.0) - Double($1.1)) } / Double(expected.count)
        try require(averageError < 8, "Appearance image content does not match its source")
    }
}
func run() throws {
    let args = Array(CommandLine.arguments.dropFirst())
    try require(args.count == 4 && ["build", "check"].contains(args[0]), "Usage: appearance.swift build|check light.png dark.png output.heic")
    let light = try image(load(args[1]), 0)
    let dark = try image(load(args[2]), 0)
    try require(light.width == dark.width && light.height == dark.height, "Appearance image sizes must match")
    if args[0] == "build" {
        let metadata = CGImageMetadataCreateMutable()
        try require(CGImageMetadataRegisterNamespaceForPrefix(metadata, "http://ns.apple.com/namespace/1.0/" as CFString, "apple_desktop" as CFString, nil), "Cannot register appearance namespace")
        let encoder = PropertyListEncoder()
        encoder.outputFormat = .binary
        let value = try encoder.encode(Appearance(l: 0, d: 1)).base64EncodedString()
        try require(CGImageMetadataSetValueWithPath(metadata, nil, "apple_desktop:apr" as CFString, value as CFString), "Cannot set appearance metadata")
        let output = NSMutableData()
        guard let destination = CGImageDestinationCreateWithData(output, UTType.heic.identifier as CFString, 2, nil) else {
            throw Failure(description: "HEIC encoder unavailable")
        }
        let options = [kCGImageDestinationLossyCompressionQuality: 0.95] as CFDictionary
        CGImageDestinationAddImageAndMetadata(destination, light, metadata, options)
        CGImageDestinationAddImage(destination, dark, options)
        try require(CGImageDestinationFinalize(destination), "HEIC encoding failed")
        try (output as Data).write(to: URL(fileURLWithPath: args[3]), options: .atomic)
    }
    try validate(args[3], light: light, dark: dark)
    print("Validated two appearance frames: \(URL(fileURLWithPath: args[3]).lastPathComponent)")
}
do { try run() } catch {
    FileHandle.standardError.write(Data("\(error)\n".utf8))
    exit(1)
}
