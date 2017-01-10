defineClass('JPViewController', {
  handleBtn: function(sender) {
    var tableViewCtrl = JPTableViewController.alloc().init()
    self.navigationController().pushViewController_animated(tableViewCtrl, YES)
  }
})

defineClass('JPTableViewController : UITableViewController <UIAlertViewDelegate>', ['data'], {
  dataSource: function() {
    var data = self.data();
    if (data) return data;
    var data = [];
    for (var i = 0; i < 20; i ++) {
      data.push("cell from js " + i);
    }
    self.setData(data)
    return data;
  },
  numberOfSectionsInTableView: function(tableView) {
    return 1;
  },
  tableView_numberOfRowsInSection: function(tableView, section) {
    return self.dataSource().length;
  },
  tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
    var cell = tableView.dequeueReusableCellWithIdentifier("cell") 
    if (!cell) {
      cell = require('UITableViewCell').alloc().initWithStyle_reuseIdentifier(0, "cell")
    }
    cell.textLabel().setText(self.dataSource()[indexPath.row()])
    return cell
  },
  tableView_heightForRowAtIndexPath: function(tableView, indexPath) {
    return 60
  },
  tableView_didSelectRowAtIndexPath: function(tableView, indexPath) {
     var alertView = require('UIAlertView').alloc().initWithTitle_message_delegate_cancelButtonTitle_otherButtonTitles("Alert",self.dataSource()[indexPath.row()], self, "OK",  null);
     alertView.show()
  },
  alertView_willDismissWithButtonIndex: function(alertView, idx) {
    console.log('click btn ' + alertView.buttonTitleAtIndex(idx).toJS())
  }
})

//replace method, add new instance method/property, add new class method, C function
require('NSDate');
require('JPEngine').addExtensions(['JPCFunction']);
JPEngine.addExtensions(['JPMemory']);
defineCFunction("NSClassFromString", "Class, id");
defineCFunction("CFUUIDCreate", "void*, int");
defineCFunction("CFUUIDCreateString", "void*, int, void*");
defineClass("AppDelegate : UIResponder <UIApplicationDelegate,UIAlertViewDelegate>", ['genUUIDBegin','uuid','genUUIDUsedTime'], {
  applicationDidBecomeActive: function(application) {
    //self.ORIGapplicationDidBecomeActive(application);
    //Call Class Method to genUUID
    self.setGenUUIDBegin(NSDate.date());
    console.log('genUUIDBegin=' + self.genUUIDBegin().description().toJS());
    var uuid = require('AppDelegate').genUUID();
    console.log("[Class genUUID]=" + uuid.toJS());
    self.setUuid(uuid);
    console.log("uuid property value=" + self.uuid().toJS());
    var endDate = NSDate.date();
    console.log('endDate=' + endDate.description().toJS());
    self.setGenUUIDUsedTime(endDate.timeIntervalSinceDate(self.genUUIDBegin()));
    console.log('Call Class Method: genUUID used time=' + self.genUUIDUsedTime());

    //Call Embeded GEN UUID CODES
    self.setGenUUIDBegin(NSDate.date());
    console.log('genUUIDBegin=' + self.genUUIDBegin().description().toJS());
    var uuidRef = CFUUIDCreate(0);
    var uuidStringRef = CFUUIDCreateString(0, uuidRef);
    var uuid = require('NSString').stringWithString(__bridge_id(uuidStringRef));
    CFRelease(uuidRef);
    CFRelease(uuidStringRef);
    console.log("uuid=" + uuid.toJS());
    self.setUuid(uuid);
    console.log("uuid property value=" + self.uuid().toJS());
    var endDate = NSDate.date();
    console.log('endDate=' + endDate.description().toJS());
    self.setGenUUIDUsedTime(endDate.timeIntervalSinceDate(self.genUUIDBegin()));
    console.log('Call Embeded GEN UUID CODES used time=' + self.genUUIDUsedTime());
  }
}, 
{
  genUUID: function() {
    console.log('Calling genUUID...');
    var uuidRef = CFUUIDCreate(0);
    var uuidStringRef = CFUUIDCreateString(0, uuidRef);
    var uuid = require('NSString').stringWithString(__bridge_id(uuidStringRef));
    CFRelease(uuidRef);
    CFRelease(uuidStringRef);
    console.log('Will return from genUUID');
    return uuid;
  },
})
