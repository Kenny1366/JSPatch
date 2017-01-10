//
//  main.m
//  JSPatch
//
//  Created by bang on 15/4/30.
//  Copyright (c) 2015年 bang. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AppDelegate.h"
#import "JPEngine.h"

int main(int argc, char * argv[]) {
    @autoreleasepool {
        @autoreleasepool {
            [JPEngine startEngine];
            NSString *sourcePath = [[NSBundle mainBundle] pathForResource:@"demo" ofType:@"js"];
            NSString *script = [NSString stringWithContentsOfFile:sourcePath encoding:NSUTF8StringEncoding error:nil];
            [JPEngine evaluateScript:script];
        }
        return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
    }
}
