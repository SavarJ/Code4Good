//
//  TitleTextFormat.swift
//  code4goodSwift
//
//  Created by Max Handler on 9/17/22.
//

import SwiftUI

struct TitleTextFormat: View {
    var inputText: String
    
    var body: some View {
        Text(inputText)
            .foregroundColor(Color.black)
            .font(.system(size: 30, weight: .bold, design: .default))
    }
}

struct TitleTextFormat_Previews: PreviewProvider {
    static var previews: some View {
        TitleTextFormat(inputText: "Hello, world!")
    }
}
