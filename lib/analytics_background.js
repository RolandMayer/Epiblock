create_ga_instance();
run();

function run() {
	//Wait 30 Seconds for Cookie Reading to be done
	setTimeout(function () {
		ga_pageview();
		ga_Event('background', 'version', manifest_version);
	}, 30000);
}

function install() {
	chrome.storage.sync.get(function (Storage) {
		//FirstRun
		if (localStorage['ga_installTime'] === undefined) {

			localStorage['ga_installTime'] = now;
			ga_getUUID();
			ga_install();

			Storage.ga_installTime = localStorage['ga_installTime'];
		}
		else
		{

		}

		chrome.storage.sync.set(Storage);

	});


}

function chrome_update() {
	ga_chrome_update();
}

function update(){
	ga_update();
}


function uninstall() {
	ga_uninstall();

}



//Google Analytics Events
function ga_notification(notification_id, notification_action) {
	ga_Event('notification', notification_id, notification_action);
}

function ga_install() {
	ga_Event('background', 'install', manifest_version);
}

function ga_uninstall() {
	ga_Event('background', 'uninstall_cancelled', manifest_version);
}

function ga_update() {
	ga_Event('background', 'update', manifest_version);
}

function ga_chrome_update() {
	ga_Event('background', 'chrome_update', manifest_version);
}

//Chrome onInstalled Events Checker
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason == "install") {
		install();
	}
	if (details.reason == "update") {
		update();
	}
	if (details.reason == "chrome_update") {
		chrome_update();
	}
});


//Start UpdateURL Updater
function setUpdateURL() {

	//Uninstall URL Setter
	var updateUninstallURL = function () {

		chrome.storage.sync.get(function (Storage) {
			if (Storage.ga_installTime !== undefined) {

				var installedDuration = Math.round((Date.now() - Storage.ga_installTime) / 1000);
			}
			else {
				installedDuration = 0;
			}

			var uninstall_url = "https://chrome.google.com/webstore/detail/";
			chrome.runtime.setUninstallURL(uninstall_url);
		});
	};

	//Update every 60 seconds
	updateUninstallURL();
	setInterval(updateUninstallURL, 60 * 1000);
}

setUpdateURL();
