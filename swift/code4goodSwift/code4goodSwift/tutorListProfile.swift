//
//  tutorListProfile.swift
//  code4goodSwift
//
//  Created by Max Handler on 9/16/22.
//

import Foundation
import SwiftUI

struct tutorListProfile: View {
    var body: some View {
        ZStack{
            Rectangle()
                .fill(Color("tutorFeedBackground"))
                .frame(width: 400, height: 230)
            HStack() {
                Image(TestData.tutors[0].profilePic)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 100, height: 70)
                        .clipShape(Circle())
                        .shadow(radius: 10)
                        .overlay(Circle().stroke(Color.red, lineWidth: 5))
                VStack {
                    Text(TestData.tutors[0].firstName + " " + TestData.tutors[0].lastName)
                        .foregroundColor(Color.white)
                    Text("JREAM Chapter: " + TestData.tutors[0].chapter)
                        .foregroundColor(Color.white)
                    Text(TestData.tutors[0].bio)
                        .foregroundColor(Color.white)
                }
            }
        }
        
    }
}

struct tutorListProfile_Previews: PreviewProvider {
    static var previews: some View {
        tutorListProfile()
    }
}
