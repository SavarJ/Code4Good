//
//  File.swift
//  code4goodSwift
//
//  Created by Max Handler on 9/16/22.
//

import Foundation
import SwiftUI

struct Tutor: Decodable {
    var id: Int
    var chapter: String
    var firstName: String
    var lastName: String
    var birthday: String
    var bio: String
    var zoomLink: String
    var availableForDropIn: Bool
    var totalHours: Int
    var points: Double
    var profilePic: String
}
