var PLUGIN_INFO =
<KeySnailPlugin>
    <name>zou search</name>
    <name lang="ja">hamazou search</name>
    <description>hamazou and tabezou search plugin</description>
    <description lang="ja">hamazou と tabezou で検索</description>
    <version>0.0.2</version>
    <updateURL>http://github.com/basyura/zou-search/raw/master/zou_search.ks.js</updateURL>
    <iconURL>http://github.com/basyura/zou-search/raw/master/logo.jpg</iconURL>
    <author mail="basyura@gmail.com" homepage="http://github.com/basyura/zou-search">basyura</author>
    <license>The MIT License</license>
    <license lang="ja">MIT ライセンス</license>
    <minVersion>1.5.0</minVersion>
    <include>main</include>
    <provides>
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
shell を呼び出すキーを登録する。
>||
key.setViewKey(':', function () {
    shell.input();
}, 'Command System');
||<
表示された入力画面にコマンドと検索したい単語を入力する。コマンドは tab で補完可。
はまぞう検索コマンド : hamazou
たべぞう検索コマンド : tabezou
>||
hamazou リファクタリング
||<
Enter で新しいタブに検索結果が表示される。バックグラウンドでタブを開きたい場合は ! をコマンドの最後に付加する。
>||
hamazou! リファクタリング
||<
コマンド入力が面倒な場合は、以下の様にあらかじめ入力した状態のショートカットキーを登録しておく。バックグランドでタブを開きたい場合は false を指定する。
>||
key.setViewKey('h', function (aEvent, aArg) {
    shell.input("hamazou ");
}, 'hamazou search', true);
||<
	
履歴：
0.0.2 shell 呼び出しに変更 http://keysnail.g.hatena.ne.jp/mooz/20100316

		
    ]]></detail>
</KeySnailPlugin>;

function defineFooZouCommand(names, description, dir) {
	shell.add(names, description,
	function (args, extra) {
		let words = encodeURIComponent(extra.left);
		let url = "http://d.hatena.ne.jp/" + user + "/" + dir + "/search?mode=&ie=utf-8&word=" + words;
		gBrowser.loadOneTab(url, null, null, null, extra.bang);
	},
	{
		bang      : true,
		literal   : 0,
		completer : function (args, extra) {
			let engines = [util.suggest.ss.getEngineByName("Google")];
			return completer.fetch.suggest(engines, true)(extra.left || "", extra.whole || "");
		}
	});
}

defineFooZouCommand(["hama[zou]"], M({ja: "はまぞう検索", en: "hamazou search"}), "hamazou");
defineFooZouCommand(["tabe[zou]"], M({ja: "たべぞう検索", en: "tabezou search"}), "tabezou");
