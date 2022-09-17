//
//  testData.swift
//  code4goodSwift
//
//  Created by Max Handler on 9/16/22.
//

import Foundation

// this data will populate the list in the tutor feed
struct TestData {
    static var tutors: [CreateTutor] = [
        CreateTutor(id: 0, chapter: "Los Angeles, California", firstName: "Trent", lastName: "Arnold", birthday: "Thursday", bio: "Been tutoring for 5 years", zoomLink: "https://rutgers.zoom.us/j/92490401458?pwd=TmJFdGk1RitKNU1nZnVwK2VqWmRXdz09", availableForDropIn: true, totalHours: 10, rating: 5.0, points: 50.0, profilePic: "tutor1"),
        CreateTutor(id: 1, chapter: "New York City, New York", firstName: "Serena", lastName: "Silver", birthday: "Friday", bio: "Been tutoring for 10 years. I enjoy playing soccer and snowboarding!", zoomLink: "https://rutgers.zoom.us/j/92490401458?pwd=TmJFdGk1RitKNU1nZnVwK2VqWmRXdz09", availableForDropIn: true, totalHours: 30, rating: 4.0, points: 120.0, profilePic: "tutor2"),
        CreateTutor(id: 2, chapter: "New York City, New York", firstName: "Sebastian", lastName: "Maldonado", birthday: "Saturday", bio: "I'm passionate about history but am open to tutoring in any subject. I'm a JREAM alum and enjoy meeting younger members of the community.", zoomLink: "https://rutgers.zoom.us/j/92490401458?pwd=TmJFdGk1RitKNU1nZnVwK2VqWmRXdz09", availableForDropIn: false, totalHours: 50, rating: 2.0, points: 100.0, profilePic: "tutor3"),
        CreateTutor(id: 3, chapter: "Los Angeles, California", firstName: "Mark", lastName: "Phillips", birthday: "Sunday", bio: "I've lived in LA my whole life and am excited to help young ambitious students make the most of their education.", zoomLink: "https://rutgers.zoom.us/j/92490401458?pwd=TmJFdGk1RitKNU1nZnVwK2VqWmRXdz09", availableForDropIn: true, totalHours: 2, rating: 3.5, points: 10.0, profilePic: "tutor4"),
        CreateTutor(id: 4, chapter: "New York City, New York", firstName: "Elizabeth", lastName: "Garcia", birthday: "Monday", bio: "I'm pursuing a career in education and enjoying life in the city!", zoomLink: "https://rutgers.zoom.us/j/92490401458?pwd=TmJFdGk1RitKNU1nZnVwK2VqWmRXdz09", availableForDropIn: false, totalHours: 8, rating: 5.0, points: 40.0, profilePic: "tutor5")
        ]
}
