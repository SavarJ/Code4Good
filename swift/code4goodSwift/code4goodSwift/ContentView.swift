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
        NavigationView {
        ZStack {
            LinearGradient(gradient: Gradient(colors: [Color.blue, Color.purple]), startPoint: .top, endPoint: .bottom)
                .edgesIgnoringSafeArea(.all)
            //NavigationView {
                VStack {
                    //Text("Tutors")
                    //    .foregroundColor(Color.white)
                    //    .font(.system(size: 45, weight: .bold, design: .default))
                    VStack(spacing: 4) {
                        ForEach(tutorFeed, id: \.id) { tutor in
                            NavigationLink(
                                destination: tutorProfile(id: tutor.id),
                                label: { tutorListProfile(id: tutor.id)}
                            )
                        }
                    }
                    Spacer()
                }.padding(.top, 30)
                .navigationBarTitle("Tutors", displayMode: .large)
                .navigationBarHidden(false)
            }
            .background(LinearGradient(gradient: Gradient(colors: [Color.blue, Color.purple]), startPoint: .top, endPoint: .bottom)
                .edgesIgnoringSafeArea(.all))
        }
            
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
