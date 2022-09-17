//
//  testData.swift
//  code4goodSwift
//
//  Created by Max Handler on 9/16/22.
//

import Foundation

struct TestData {
    static var tutors: [CreateTutor] = [
        CreateTutor(id: 0, chapter: "Los Angeles, California", firstName: "Trent", lastName: "Arnold", birthday: "Thursday", bio: "Been tutoring for 5 years", zoomLink: "tutorroom1.com", availableForDropIn: true, totalHours: 10, points: 50.0, profilePic: "tutor1"),
        CreateTutor(id: 1, chapter: "New York City, New York", firstName: "Serena", lastName: "Silver", birthday: "Friday", bio: "Been tutoring for 10 years. I enjoy playing soccer and snowboarding!", zoomLink: "tutorroom2.com", availableForDropIn: true, totalHours: 30, points: 150.0, profilePic: "tutor2")
        ]
}
