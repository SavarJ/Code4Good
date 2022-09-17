//
//  ContentView.swift
//  code4goodSwift
//
//  Created by Max Handler on 9/16/22.
//

import SwiftUI

struct ContentView: View {
    let tutorFeed = TestData.tutors
    
    var body: some View {
        ZStack {
            LinearGradient(gradient: Gradient(colors: [Color.blue, Color.black]), startPoint: .top, endPoint: .bottom)
                .edgesIgnoringSafeArea(.all)
            VStack {
                Text("Tutors")
                    .foregroundColor(Color.white)
                    .font(.system(size: 45, weight: .bold, design: .default))
                VStack(spacing: 4) {
                    ForEach(tutorFeed, id: \.id) { tutor in
                        tutorListProfile(id: tutor.id)
                    }
                }
                Spacer()
            }
        }
            
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
