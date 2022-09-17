//
//  tutorProfile.swift
//  code4goodSwift
//
//  Created by Max Handler on 9/17/22.
//

import SwiftUI

struct tutorProfile: View {
    let id: Int
    
    var body: some View {
        ZStack {
            LinearGradient(gradient: Gradient(colors: [Color.blue, Color.purple]), startPoint: .top, endPoint: .bottom)
                .edgesIgnoringSafeArea(.all)
            VStack(spacing:10) {
                Text(TestData.tutors[id].firstName + " " + TestData.tutors[id].lastName)
                    .foregroundColor(Color.white)
                    .font(.system(size: 30, weight: .bold, design: .default))
                Image(TestData.tutors[id].profilePic)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 200, height: 140)
                        .clipShape(Circle())
                        .shadow(radius: 10)
                        .overlay(Circle().stroke(Color.red, lineWidth: 5))
                Text("Rating: \(TestData.tutors[id].rating, specifier: "%.1f")/ 5.0")
                    .foregroundColor(Color.white)
                    .font(.system(size: 30, weight: .bold, design: .default))
                Spacer()
            }
        }
    }
}

struct tutorProfile_Previews: PreviewProvider {
    static var previews: some View {
        tutorProfile(id: 0)
    }
}
