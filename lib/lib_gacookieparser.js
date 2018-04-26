/*
 Copyright (c) 2013, Fusionbox, Inc.
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var GACookieParser = function (cookies)
{
	if (cookies === undefined) {
		cookies = document.cookie;
	}
	this.cookies = this.parseCookies(cookies);
	this.data = {};

	this.utmz = this.cookies['__utmz'];
	if (this.utmz === undefined) {
		// No Google Analytics cookie? That's all for the day
		return;
	}

	/* Google Analytics Cookie looks like that
	 *   stuff.otherstuff.key=value|otherkey=othervalue|something.lastkey=value
	 * We're trying to parse it to have:
	 *   {key: 'value', otherkey: 'othervalue', lastkey: 'value'}
	 * And if one key matches the GACookieParser.values, we put it in data
	 */
	for (var key in this.values) {
		if (this.values.hasOwnProperty(key)) {
			var matches;
			if (matches = this.utmz.match("(?:\.|\|)" + key + "=([^|]*)(?:$|\|)"))
				this.data[key] = matches[1];
		}
	}
};

GACookieParser.prototype.parseCookies = function (cookies)
{
	var cookiesList = cookies.split("; "),
		cookiesObject = {};

	for (var i in cookiesList) {
		var cookie = cookiesList[i],
			separator = cookie.indexOf("="),
			key = cookie.substring(0, separator),
			value = cookie.substring(separator + 1);

		cookiesObject[key] = value;
	}

	return cookiesObject;
};

GACookieParser.prototype.values = {
	utmccn: 'campaign id',
	utmcsr: 'referral source',
	utmcct: 'referring url path',
	utmctr: 'last search term used',
	utmcmd: 'medium'
};

GACookieParser.prototype.get = function (key)
{
	if (this.values.hasOwnProperty(key)) {
		return decodeURIComponent(this.data[key]);
	} else {
		return null;
	}
};

//END OF LICENSE
function getCookies(domain, name, callback)
{
	chrome.cookies.get({"url": domain, "name": name}, function (cookie)
	{
		if (callback) {
			if (cookie != null) {
				callback(cookie.value);
			}
		}
	});
}














































