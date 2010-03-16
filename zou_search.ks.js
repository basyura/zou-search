var PLUGIN_INFO =
<KeySnailPlugin>
    <name>zou search</name>
    <name lang="ja">hamazou search</name>
    <description>hamazou and tabezou search plugin</description>
    <description lang="ja">hamazou と tabezou で検索するプラグインです</description>
    <version>0.0.1</version>
    <updateURL>http://github.com/basyura/zou-search/zou_search.ks.js</updateURL>
    <iconURL>http://github.com/</iconURL>
    <author mail="basyura@gmail.com" homepage="http://basyura.org/">basyura</author>
    <license>The MIT License</license>
    <license lang="ja">MIT ライセンス</license>
    <minVersion>1.0</minVersion>
    <include>main</include>
    <provides>
        <ext>hamazou-search</ext>
        <ext>tabezou-search</ext>
    </provides>
	<options>
		<option>
			<name>zou_search.user</name>
			<type>string</type>
			<description>hatena user id</description>
			<description lang="ja">はてなのユーザID</description>
		</option>
	</options>
    <detail><![CDATA[
=== Usage ===
set hatena user id.
>||
plugins.options["zou_search.user"] = "basyura"
||<
    ]]></detail>
    <detail lang="ja"><![CDATA[
=== 使い方 ===
はてなユーザIDを設定する。
>||
plugins.options["zou_search.user"] = "basyura"
||<
    ]]></detail>
</KeySnailPlugin>;

ext.add("hamazou-search", function (ev, arg) {
	var user = plugins.options["zou_search.user"];
	if(user == undefined) {
		alert("you need to set zou_search.user option.");
		return;
	}
	prompt.reader({
		message    : "hamazou: ",
		callback   : function (word) {
			word = encodeURIComponent(word);
			var url = "http://d.hatena.ne.jp/" 
			                + user 
							+ "/hamazou/search?mode=&ie=utf-8&word=" 
							+ word;
        	gBrowser.loadOneTab(url, null, null, null, true);
		}
	});
}, M({ja: "はまぞう検索", en: "hamazou search"}));

ext.add("tabezou-search", function (ev, arg) {
	var user = plugins.options["zou_search.user"];
	if(user == undefined) {
		alert("you need to set zou_search.user option.");
		return;
	}
	prompt.reader({
		message    : "tabezou: ",
		callback   : function (word) {
			word = encodeURIComponent(word);
			var url = "http://d.hatena.ne.jp/" 
			                + user 
							+ "/tabezou/search?mode=&ie=utf-8&word=" 
							+ word;
        	gBrowser.loadOneTab(url, null, null, null, true);
		}
	});
}, M({ja: "たべぞう検索", en: "tabezou search"}));
