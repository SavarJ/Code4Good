//
//  createTutor.swift
//  code4goodSwift
//
//  Created by Max Handler on 9/16/22.
//

import Foundation
import SwiftUI

struct CreateTutor: Codable, Identifiable, Equatable, Hashable {
    var id: Int
    var chapter: String
    var firstName: String
    var lastName: String
    var birthday: String
    var bio: String
    var zoomLink: String
    var availableForDropIn: Bool
    var totalHours: Int
    var rating: Double
    var points: Double
    var profilePic: String
    static let `default` = CreateTutor(id: 0, chapter: "Los Angeles", firstName: "Fake", lastName: "Tutor", birthday: "none", bio: "not real tutor", zoomLink: "fakeurl.com", availableForDropIn: false, totalHours: 0, rating: 0.0, points: 0.0, profilePic: "tutor1")
}

extension CreateTutor {
    enum CodingKeys: String, CodingKey {
        case id, chapter, firstName, lastName, birthday, bio, zoomLink, availableForDropIn, totalHours, rating, points, profilePic
    }
    
    static func == (lhs: CreateTutor, rhs: CreateTutor) -> Bool {
        return lhs.id == rhs.id
    }
}
