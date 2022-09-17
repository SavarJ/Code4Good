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
                VStack {
                    VStack(spacing: 4) {
                        ForEach(tutorFeed, id: \.id) { tutor in
                            // each row that has a tutor profile serves as a button to a page with more information about the tutor
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
