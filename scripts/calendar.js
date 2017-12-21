var myCal = document.getElementById("adventCal");
var currentDate = new Date();
var dayDoor;

function Door(calendar, day) {

	this.width = ((calendar.width - 0.1 * calendar.width) / 4) * 0.95;
	this.height = ((calendar.height - 0.1 * calendar.height) / 6) * 0.95;
	this.adventMessage = 'Day ' + day + ' of Advent\n\n' + '"' + messages[day - 1][0] + '"\n\n\t' + 'by ' + messages[day - 1][1] + '\n\n';
	this.x = ( 0.04 * calendar.width + ((day- 1) % 4) * (1.1 * this.width) );
	this.y = - ( 0.96 * calendar.height - Math.floor((day - 1) / 4) * (1.1 * this.height) );

	this.content = function() { 
		
		var node = document.createElement("li");
		document.getElementById("adventDoors").appendChild(node);
		node.id = "door" + day;
		node.style.cssText = "width: " + this.width + "px; height: " + this.height + "px; top: " + this.y + "px; left: " + this.x + "px;";

		var innerNode = document.createElement("a");
		document.getElementById("door" + day).appendChild(innerNode);
		innerNode.innerHTML = day;
		innerNode.href = "#";

		if( ( currentDate.getMonth() + 1 ) < 12 || currentDate.getDate() < day ) {
			innerNode.className = "disabled";
			innerNode.onclick = function() {
				//localStorage.setItem("dayDoor", day);
				//window.open("/home/itpc/Työpöytä/Jenni/advent-calendar/no-peeking.html", '_blank', 'toolbar=0,location=0,menubar=0');
                var dateObj = new Date();
                var thisDay = dateObj.getUTCDate();
                var remaining = day - thisDay;
                alert("Ei kurkita! Luukku aukeaa " + remaining + " päivän kuluttua.")
				return false;
			}
		} else {
			var adventMessage = this.adventMessage;
			innerNode.onclick = function() {
				sessionStorage.setItem("dayDoor", day);
				window.open("https://jpenttila.github.io/musical-advent-calendar/doors/luukku" + day + ".html", '_blank', 'toolbar=0,location=0,menubar=0');
				return false;
			}
		}	
	};

}

(function() {
	var doors = [];

	for(var i = 0; i < 24; i++) {

		doors[i] = new Door(myCal, i + 1);
		doors[i].content();

	}

	return doors;
})();

