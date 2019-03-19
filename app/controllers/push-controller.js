var OneSignal = require('onesignal-node');
var config = require('../../config');

var myClient = new OneSignal.Client({
	app: { appAuthKey: config.onesignal.key, appId: config.onesignal.app }
});

exports.pushToUser = function (userId, msg, title, action) {
    var notification = new OneSignal.Notification({
        contents: {
            en: msg,
        }
    });

    notification.setFilters([
        {'field': 'tag', 'key': 'user_id', 'value': userId}
    ]);

    notification.setParameter('data', {'action': action});
    notification.setParameter('headings', {en: title});
    notification.setParameter('ios_badgeType', 'Increase');
    notification.setParameter('ios_badgeCount', '1');
    
    myClient.sendNotification(notification, function (err, resp, data) {
        if (err) {
            console.log('Something went wrong...');
        } else {
            console.log('err: ', data);
        }
     });
};