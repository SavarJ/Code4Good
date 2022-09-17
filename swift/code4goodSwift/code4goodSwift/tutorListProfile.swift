//
//  tutorListProfile.swift
//  code4goodSwift
//
//  Created by Max Handler on 9/16/22.
//

import Foundation
import SwiftUI

struct tutorListProfile: View {
    let id: Int
    
    var body: some View {
        ZStack{
            HStack(spacing: -1) {
                Image(TestData.tutors[id].profilePic)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 100, height: 70)
                        .clipShape(Circle())
                        .shadow(radius: 10)
                        .overlay(Circle().stroke(Color.red, lineWidth: 5))
                        .padding(.bottom, 20)
                VStack(spacing: 2) {
                    HStack {
                        Text(TestData.tutors[id].firstName + " " + TestData.tutors[id].lastName)
                            .foregroundColor(Color.white)
                            .font(.system(size: 30, weight: .bold, design: .default))
                        Spacer()
                    }
                    HStack {
                        Text(TestData.tutors[id].chapter)
                            .foregroundColor(Color.white)
                            .font(.system(size: 16, weight: .medium, design: .default))
                            .frame(width: 280, alignment: .leading)
                        Spacer()
                    }
                    HStack {
                        Text(TestData.tutors[id].bio)
                            .foregroundColor(Color.white)
                            .font(.system(size: 14, weight: .medium, design: .default))
                            .padding(.top, 25)
                            .padding(.bottom, 5)
                        Spacer()
                    }
                }
            }
            .background(RoundedRectangle(cornerRadius: 12).foregroundColor(Color("tutorFeedBackground")))
        }
        }
        
    }

struct tutorListProfile_Previews: PreviewProvider {
    static var previews: some View {
        tutorListProfile(id: 0)
    }
}
