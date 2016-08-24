var marryable = {};

var scale = 1;

// Background images (male and female MU)
var bgPict = [];

// Folder to search for character faces
var charsFolder = "Img/Chars/";

var params = {};

function init() {
	processParams();
	initGameSpecific();
	initCharCBs();
	if("save" in params) {
		loadSave(params["save"]);
		updateCharCBs();
	}
	ReloadCanvas();
	updateSaveText();
}

function refresh() {
	initGameSpecific();
	initCharCBs();
	ReloadCanvas();
	updateSaveText();
}

var alphabet = "abcdefghijklmnopqrstuvwxyz";

function loadSave(save) {
	var needsRefresh = false;
	
	var cb_game = document.getElementById("cb_game");
	if(save[0] != cb_game.value) {
		cb_game.value = save[0];
		needsRefresh = true;
	}
	var cb_hf = document.getElementById("cb_hf");
	if(save[1] != cb_hf.value) {
		cb_hf.value = save[1];
		needsRefresh = true;
	}
	
	if(needsRefresh) {
		refresh();
	}
	
	// Decode spouses
	var i = 2;
	for(var x in marryable) {
		var spId = alphabet.indexOf(save[i]) - 1;
		if(spId < 0)
			marryable[x].spouse = "";
		else
			marryable[x].spouse = marryable[x].spChoices[spId];
		i++;
	}
}

function makeSave() {
	var save = "";
	var cb_game = document.getElementById("cb_game");
	save += cb_game.value;
	var cb_hf = document.getElementById("cb_hf");
	save += cb_hf.value;
	for(var x in marryable) {
		var spId = marryable[x].spChoices.indexOf(marryable[x].spouse) + 1;
		save += alphabet[spId];
	}
	return save;
}

function processParams()
{
	var parameters = location.search.substring(1).split("&");
	for(var p in parameters)
	{
		var temp = parameters[p].split("=");
		params[unescape(temp[0])] = unescape(temp[1]);
	}
	
	var c = document.getElementById("canvas");
	if("size" in params)
	{
		c.width = params["size"];
		c.height = params["size"];
	}
	
	if("hidepanel" in params && params["hidepanel"] == "true")
	{
		var e = document.getElementById("left");
		e.style.display = 'none';
	}
}

function initGameSpecific() {
	var e = document.getElementById("cb_game");
	if(e.value == "b") // Birthrght
		initBirthright();
	else if(e.value == "c") // Conquest
		initConquest();
	else if(e.value == "r") // Revelations
		initRevelations();
	else // Awakening
		initAwakening();
}

function initAwakening() {
	// Files
	charsFolder = "Img/Chars/Awakening/";
	bgPict = ["Img/template_awakening_mamu.png", "Img/template_awakening_femu.png"];
	
	marryable = {};
	// MU
	var e = document.getElementById("cb_hf");
	if(e.value == "m")
		marryable['MaMU'] = {x:903, y:200, spouse:"", spChoices:["Anna","Aversa","Cherche","Cordelia","Cynthia","Emmeryn","Flavia","Kjelle","Lissa","Lucina","Maribelle","Miriel","Nah","Nowi","Noire","Olivia","Panne","Sayri","Severa","Sully","Sumia","Tharja","Tiki"]}
	else
		marryable['FeMU'] = {x:803, y:121, spouse:"", spChoices:["Chrom","Basilio","Brady","Donnel","Frederick","Gaius","Gangrel","Gerome","Gregor","Henry","Inigo","Kellam","Laurent","Libra","Lonqu","Owain","Ricken","Stahl","Vaike","Virion","Walhart","Yarne","Yenfay"]}
	
	marryable['Chrom'] = {x:1003, y:407, spouse:"", spChoices:["FeMU","Sully","Sumia","Maribelle","Olivia"]}
	marryable['Sumia'] = {x:967, y:762, spouse:"", spChoices:["MaMU","Chrom","Frederick","Gaius","Henry"]}
	marryable['Lissa'] = {x:585, y:1019, spouse:"", spChoices:["MaMU","Frederick","Virion","Vaike","Stahl","Kellam","Lonqu","Ricken","Gaius","Gregor","Libra","Henry","Donnel"]}
	marryable['Olivia'] = {x:153, y:861, spouse:"", spChoices:["MaMU","Chrom","Frederick","Virion","Vaike","Stahl","Kellam","Lonqu","Ricken","Gaius","Gregor","Libra","Henry","Donnel"]}
	marryable['Maribelle'] = {x:45, y:411, spouse:"", spChoices:["MaMU","Chrom","Frederick","Virion","Vaike","Stahl","Kellam","Lonqu","Ricken","Gaius","Gregor","Libra","Henry","Donnel"]}
	marryable['Sully'] = {x:1024, y:528, spouse:"", spChoices:["MaMU","Chrom","Frederick","Virion","Vaike","Stahl","Kellam","Lonqu","Ricken","Gaius","Gregor","Libra","Henry","Donnel"]}
	marryable['Cordelia'] = {x:153, y:200, spouse:"", spChoices:["MaMU","Frederick","Virion","Vaike","Stahl","Kellam","Lonqu","Ricken","Gaius","Gregor","Libra","Henry","Donnel"]}
	marryable['Cherche'] = {x:45, y:645, spouse:"", spChoices:["MaMU","Frederick","Virion","Vaike","Stahl","Kellam","Lonqu","Ricken","Gaius","Gregor","Libra","Henry","Donnel"]}
	marryable['Panne'] = {x:809, y:939, spouse:"", spChoices:["MaMU","Frederick","Virion","Vaike","Stahl","Kellam","Lonqu","Ricken","Gaius","Gregor","Libra","Henry","Donnel"]}
	marryable['Miriel'] = {x:349, y:991, spouse:"", spChoices:["MaMU","Frederick","Virion","Vaike","Stahl","Kellam","Lonqu","Ricken","Gaius","Gregor","Libra","Henry","Donnel"]}
	marryable['Tharja'] = {x:349, y:65, spouse:"", spChoices:["MaMU","Frederick","Virion","Vaike","Stahl","Kellam","Lonqu","Ricken","Gaius","Gregor","Libra","Henry","Donnel"]}
	marryable['Nowi'] = {x:585, y:36, spouse:"", spChoices:["MaMU","Frederick","Virion","Vaike","Stahl","Kellam","Lonqu","Ricken","Gaius","Gregor","Libra","Henry","Donnel"]}

	removeWrongMU(e.value);
}

function initBirthright() {
	// Files
	charsFolder = "Img/Chars/Fates/";
	bgPict = ["Img/template_birthright_mamu.png", "Img/template_birthright_femu.png"];
	
	marryable = {};
	// MU
	var e = document.getElementById("cb_hf");
	if(e.value == "m")
		marryable['MaMU'] = {x:30, y:528, spouse:"", spChoices:["Azura","Caeldori","Felicia","Hana","Hinoka","Kagero","Midori","Mitama","Mozu","Oboro","Orochi","Reina","Rhajat","Rinkah","Sakura","Scarlet","Selkie","Setsuna","Sophie"]}
	else
		marryable['FeMU'] = {x:45, y:645, spouse:"", spChoices:["Asugi","Azama","Dwyer","Hayato","Hinata","Hisame","Izana","Jakob","Kaden","Kaze","Kiragi","Rhajat","Ryoma","Saizo","Shigure","Shiro","Shura","Silas","Subaki","Takumi","Yukimura"]}
	
	marryable['Kaze'] = {x:85, y:295, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	marryable['Azura'] = {x:153, y:200, spouse:"", spChoices:["MaMU","Jakob","Silas","Kaze","Ryoma","Takumi","Saizo","Kaden","Hinata","Azama","Subaki","Hayato"]}
	marryable['Silas'] = {x:462, y:36, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	marryable['Saizo'] = {x:699, y:64, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	marryable['Subaki'] = {x:903, y:200, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	marryable['Hinata'] = {x:1003, y:407, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	marryable['Takumi'] = {x:1003, y:646, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	marryable['Azama'] = {x:902, y:862, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	marryable['Hayato'] = {x:700, y:991, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	marryable['Kaden'] = {x:460, y:1019, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	marryable['Ryoma'] = {x:242, y:939, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	marryable['Jakob'] = {x:85, y:761, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro"]}
	
	removeWrongMU(e.value);
}

function initConquest() {
	// Files
	charsFolder = "Img/Chars/Fates/";
	bgPict = ["Img/template_conquest_mamu.png", "Img/template_conquest_femu.png"];
	
	marryable = {};
	// MU
	var e = document.getElementById("cb_hf");
	if(e.value == "m")
		marryable['MaMU'] = {x:30, y:528, spouse:"", spChoices:["Azura","Beruka","Camilla","Charlotte","Effie","Elise","Felicia","Flora","Mozu","Niles","Nyx","Peri","Selena"]}
	else
		marryable['FeMU'] = {x:45, y:645, spouse:"", spChoices:["Arthur","Benny","Gunter","Izana","Jakob","Kaze","Keaton","Laslow","Leo","Niles","Odin","Shura","Silas","Xander"]}
	
	marryable['Kaze'] = {x:85, y:295, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Azura'] = {x:153, y:200, spouse:"", spChoices:["MaMU,Jakob","Silas","Kaze","Xander","Leo","Benny","Keaton","Arthur","Odin","Laslow","Niles"]}
	marryable['Silas'] = {x:462, y:36, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Leo'] = {x:699, y:64, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Benny'] = {x:903, y:200, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Niles'] = {x:1003, y:407, spouse:"", spChoices:["MaMU","FeMU","Felicia","Azura","Mozu","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Odin'] = {x:1003, y:646, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Arthur'] = {x:902, y:862, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Xander'] = {x:700, y:991, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Laslow'] = {x:460, y:1019, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Keaton'] = {x:242, y:939, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Jakob'] = {x:85, y:761, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	
	
	
	removeWrongMU(e.value);
}

function initRevelations() {
	// Files
	charsFolder = "Img/Chars/Fates/";
	bgPict = ["Img/template_revelations_mamu.png", "Img/template_revelations_femu.png"];
	
	marryable = {};
	// MU
	var e = document.getElementById("cb_hf");
	if(e.value == "m")
		marryable['MaMU'] = {x:844, y:330, spouse:"", spChoices:["Anna","Azura","Beruka","Caeldori","Camilla","Charlotte","Effie","Elise","Felicia","Flora","Forrest","Hana","Hinoka","Kagero","Midori","Mitama","Mozu","Niles","Nina","Nyx","Oboro","Ophelia","Orochi","Peri","Reina","Rhajat","Rinkah","Sakura","Scarlet","Selena","Selkie","Setsuna","Soleil","Sophie","Velouria"]}
	else
		marryable['FeMU'] = {x:720, y:329, spouse:"", spChoices:["Arthur","Asugi","Azama","Benny","Dwyer","Fuga","Gunter","Hayato","Hinata","Hisame","Ignatius","Izana","Jakob","Kaden","Kaze","Keaton","Kiragi","Laslow","Leo","Niles","Odin","Percy","Rhajat","Ryoma","Saizo","Shigure","Shiro","Shura","Siegbert","Silas","Subaki","Takumi","Xander","Yukimura"]}
	
	marryable['Kaze'] = {x:993, y:734, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Azura'] = {x:565, y:737, spouse:"", spChoices:["MaMU","Jakob","Silas","Kaze","Ryoma","Takumi","Saizo","Kaden","Hinata","Azama","Subaki","Hayato","Xander","Leo","Benny","Keaton","Arthur","Odin","Laslow","Niles"]}
	marryable['Silas'] = {x:443, y:347, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Jakob'] = {x:1157, y:463, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}

	marryable['Saizo'] = {x:85, y:295, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Subaki'] = {x:242, y:939, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Hinata'] = {x:85, y:761, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Takumi'] = {x:242, y:121, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Azama'] = {x:30, y:528, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Hayato'] = {x:461, y:1019, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Kaden'] = {x:700, y:991, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Ryoma'] = {x:462, y:36, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}

	marryable['Leo'] = {x:1274, y:64, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Benny'] = {x:1275, y:991, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Niles'] = {x:1578, y:407, spouse:"", spChoices:["MaMU","FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Odin'] = {x:1578, y:646, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Arthur'] = {x:1478, y:861, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Xander'] = {x:1037, y:36, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Laslow'] = {x:1478, y:200, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	marryable['Keaton'] = {x:1036, y:1019, spouse:"", spChoices:["FeMU","Felicia","Azura","Mozu","Hinoka","Sakura","Rinkah","Orochi","Kagero","Hana","Setsuna","Oboro","Camilla","Elise","Charlotte","Effie","Peri","Beruka","Selena","Nyx"]}
	
	
	
	
	removeWrongMU(e.value);
}

// Remove MU of opposite gender
function removeWrongMU(gender) {
	var wrongMU;
	if(gender == "m")
		wrongMU = "FeMU";
	else
		wrongMU = "MaMU";
	for(var x in marryable)
	{
		var index = marryable[x].spChoices.indexOf(wrongMU);
		if (index > -1) {
			marryable[x].spChoices.splice(index, 1);
		}
	}
	
}
	
function ReloadCanvas() {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
    var img = new Image();
    img.onload=function(){
		if("size" in params && params["size"] == "full")
		{
			scale = 1;
		}
		else
		{
			scale = c.height / img.height;
		}
		c.width = img.width * scale;
		c.height = img.height * scale;
		
		var height = img.height * scale;
		var width = img.width * scale;
        ctx.drawImage(img,0,0,width,height);
		
		for(name in marryable) {
			placeHead(name);
		}
    }
	
	// BG according to male or female MU
	var e = document.getElementById("cb_hf");
	if(e.value == "m")
		img.src = bgPict[0];
	else
		img.src = bgPict[1];
}


function placeHead(name) {
	if(name in marryable)
	{
		var spouse = marryable[name].spouse;
		if(spouse != "") {
			var c = document.getElementById("canvas");
			var ctx = c.getContext("2d");
			
			var x = marryable[name].x;
			var y = marryable[name].y;
			
			var img = new Image();
			img.onload=function(){
				x *= scale;
				y *= scale;
				var width = img.width*scale;
				var height = img.height*scale;
			
				ctx.drawImage(img,x,y,width,height);
			}
			img.src = charsFolder+spouse+".png";
		}
    }
}

function changeSpouse(name, spName) {
	if(name in marryable) {
		var oldSpouse = marryable[name].spouse
		marryable[name].spouse = spName;
		// Updates for consistency
		if(spName in marryable && marryable[spName].spouse != name) {
			changeSpouse(spName, name);
		}
		if(oldSpouse in marryable && marryable[oldSpouse].spouse == name) {
			marryable[oldSpouse].spouse = "";
		}
		else {
			// not in marryable, but may be married to someone
			for(var x in marryable)
			{
				if(x != name && marryable[x].spouse == spName){
					marryable[x].spouse = "";
				}
			}
		}
	}
}

function initCharCBs() {
	var section = document.getElementById("spouse_choices");
	// Clear
	section.innerHTML="";
	// Add
	for(var x in marryable)
	{
		var charSection = document.createElement('tr');
		charSection.id = "section_"+x;
		var t = document.createTextNode(x);
		var cb = document.createElement('select');
		cb.id = "spouse_"+x;
		// Remplissage CB
		var opt_vide = document.createElement("option");
		cb.appendChild(opt_vide);
		for(s in marryable[x].spChoices)
		{
			var spName = marryable[x].spChoices[s];
			var opt = document.createElement("option");
			opt.value = spName;
			opt.textContent = spName;
			cb.appendChild(opt);
		}
		cb.setAttribute("onchange", "onSpouseChange(this);");
		cb.setAttribute("data-character", x);
		
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		td1.appendChild(t); 
		td2.appendChild(cb); 
		charSection.appendChild(td1); 
		charSection.appendChild(td2); 
		section.appendChild(charSection); 
	}
}

var updating = false;

function updateCharCBs() {
	updating = true;
	for(var x in marryable)
	{
		var sel = document.getElementById("spouse_"+x);
		sel.value = marryable[x].spouse;
	}
	updating = false;
}

function onSpouseChange(select){
	if(!updating) {
		var character = select.dataset.character;
		var spouse = select.value;
		changeSpouse(character, spouse);
		updateCharCBs();
		ReloadCanvas();
		updateSaveText();
	}
};

function updateSaveText() {
	var section = document.getElementById("save_code");
	section.innerHTML=makeSave();
}

function onLoadSave() {
	var save = prompt("Enter your save code","");
	loadSave(save);
	updateCharCBs();
	ReloadCanvas();
	updateSaveText();
}

function onGenerateBigImage() {
	window.open(window.location.href+"?size=full&hidepanel=true&save="+makeSave());
}