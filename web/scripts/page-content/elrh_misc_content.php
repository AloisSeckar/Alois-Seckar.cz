<?php
class ELRHPageContentRenderer {
	public static function renderContent($page_data) {
		// use "echo" function to render all contents of current page
		echo '<h1>ZÁBAVA</h1>'.PHP_EOL;
		echo '<p>'.PHP_EOL;
			echo 'Zde najdete všechno ostatní, co nenajdete jinde:'.PHP_EOL;
		echo '</p>'.PHP_EOL;
		echo '<ul>'.PHP_EOL;
			echo '<li><strong><a href="misc-run" title="Běžecké výkony">BĚH</a></strong> - přehled mých historických běžeckých statistik.</li>'.PHP_EOL;
			echo '<li><strong><a href="misc-writing" title="Literární tvorba">PSANÍ</a></strong> - mám na svědomí několik pokusů o&nbsp;povídky a&nbsp;jiná literární díla.</li>'.PHP_EOL;
			echo '<li><strong><a href="misc-history" title="Historické okénko">HISTORIE</a></strong> - několik projektů historického bádání, zejména naše <a href="http://krc-historie.cz" title="Stará Krč">Stará Krč</a>.</li>'.PHP_EOL;
			echo '<li><strong><a href="misc-soft" title="Hraní softbalu">SOFTBAL</a></strong> - věnuju či věnoval jsem se celé řadě sportů, ale softbal hraje prim.</li>'.PHP_EOL;
			echo '<li><strong><a href="misc-hansp" title="Hraní fotbalu">HANSPAULKA</a></strong> - hned za softbalem je pražský malý fotbal, kde dělám brankáře.</li>'.PHP_EOL;
			echo '<li><strong><a href="misc-photo" title="Moje fotografie">FOTOGRAFOVÁNÍ</a></strong> - nejsem profík, ale baví mě čas od času fotit a&nbsp;pak si s&nbsp;fotkami trochu hrát.</li>'.PHP_EOL;
			echo '<li><strong><a href="misc-music" title="Moje hudba">HUDBA</a></strong> - jeden čas jsem také zkoušel skládat hudbu, přičemž několik výsledků ta snaha měla.</li>'.PHP_EOL;
			echo '<li><strong><a href="misc-links" title="Všeobecný rozcestník">ROZCESTNÍK</a></strong> - odkazy na všemožné zajímavé weby.</li>'.PHP_EOL;
	    echo '</ul>'.PHP_EOL;
		echo '<p>'.PHP_EOL;
			echo 'Asi v&nbsp;ničem vyloženě nevynikám, ale zase si to vynahrazuju tím, že se o&nbsp;mnoho věcí pokouším alespoň trochu. '.PHP_EOL;
			echo 'Zároveň se výsledkem rád pochlubím. Možná mi prostě jen chybí soudnost, ale posuďte to sami. '.PHP_EOL;
			echo 'Doufám, že se bude sekce "Zábava" postupně rozrůstat o&nbsp;další nápady do sbírky.'.PHP_EOL;
		echo '</p>'.PHP_EOL;
	}
}