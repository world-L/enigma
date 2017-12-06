		var alphaPattern = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	
		var reflectorA = ['E','J','M','Z','A','L','Y','X','V','B','W','F','C','R','Q','U','O','N','T','S','P','I','K','H','G','D'];
		var reflectorB = ['Y','R','U','H','Q','S','L','D','P','X','N','G','O','K','M','I','E','B','F','Z','C','W','V','J','A','T'];
		var reflectorC = ['F','V','P','J','I','A','O','Y','E','D','R','Z','X','W','G','C','T','K','U','Q','S','B','N','M','H','L'];
		var roter1 = ['E','K','M','F','L','G','D','Q','V','Z','N','T','O','W','Y','H','X','U','S','P','A','I','B','R','C','J'];
		var roter2 = ['A','J','D','K','S','I','R','U','X','B','L','H','W','T','M','C','Q','G','Z','N','P','Y','F','V','O','E'];
		var roter3 = ['B','D','F','H','J','L','C','P','R','T','X','V','Z','N','Y','E','I','W','G','A','K','M','U','S','Q','O'];
		var roter4 = ['E','S','O','V','P','Z','J','A','Y','Q','U','I','R','H','X','L','N','F','T','G','K','D','C','M','W','B'];
		var roter5 = ['V','Z','B','R','G','I','T','Y','U','P','S','D','N','H','L','X','A','W','M','J','Q','O','F','E','C','K'];

		var plugSetting = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

		var roter1Notch = 'Q';
		var roter2Notch = 'E';	
		var roter3Notch = 'V';
		var roter4Notch = 'J';
		var roter5Notch = 'Z';

		var refslot = [''];
		var slot1 = [''];
		var slot2 = [''];
		var slot3 = [''];
		var notch1 = '';
		var notch2 = '';	
		var notch3 = '';

		var slot1Rot = 0;
		var slot2Rot = 0;
		var slot3Rot = 0;
		var ringSet1 = 0;
		var ringSet2 = 0;
		var ringSet3 = 0;

		function selectRoter(ref,num1,num2,num3){
			switch (ref){
				case 1: refslot = reflectorA; break;
				case 2: refslot = reflectorB; break;
				case 3: refslot = reflectorC; break;
				default: alert("error");
			}
			switch (num1){
				case 1: slot1 = roter1; notch1 = roter1Notch; break;
				case 2: slot1 = roter2; notch1 = roter2Notch; break;
				case 3: slot1 = roter3; notch1 = roter3Notch; break;
				case 4: slot1 = roter4; notch1 = roter4Notch; break;
				case 5: slot1 = roter5; notch1 = roter5Notch; break;
				default: alert("error");
			}
			switch (num2){
				case 1: slot2 = roter1; notch2 = roter1Notch; break;
				case 2: slot2 = roter2; notch2 = roter2Notch; break;
				case 3: slot2 = roter3; notch2 = roter3Notch; break;
				case 4: slot2 = roter4; notch2 = roter4Notch; break;
				case 5: slot2 = roter5; notch2 = roter5Notch; break;
				default: alert("error");
			}
			switch (num3){
				case 1: slot3 = roter1; notch3 = roter1Notch; break;
				case 2: slot3 = roter2; notch3 = roter2Notch; break;
				case 3: slot3 = roter3; notch3 = roter3Notch; break;
				case 4: slot3 = roter4; notch3 = roter4Notch; break;
				case 5: slot3 = roter5; notch3 = roter5Notch; break;
				default: alert("error");
			}
		}
		function initRotState(num1,num2,num3){
			ringSet1 = num1;
			ringSet2 = num2;
			ringSet3 = num3;
			return;
		}
		function showRotState(){
			document.getElementById("roter1").innerHTML = alphaPattern[slot1Rot];
			document.getElementById("roter2").innerHTML = alphaPattern[slot2Rot];
			document.getElementById("roter3").innerHTML = alphaPattern[slot3Rot];
		}
		function rotateRoter(slotNum,direct){
			if (slotNum == 1) {
			 	slot1Rot = (!direct)?((slot1Rot+1)%26):((slot1Rot + 25)%26);
			} else if (slotNum == 2) {
				slot2Rot = (!direct)?((slot2Rot+1)%26):((slot2Rot + 25)%26);
			} else{				
				slot3Rot = (!direct)?((slot3Rot+1)%26):((slot3Rot + 25)%26);	
			}
			showRotState();			
		}
		function addPlug(char1,char2){
			var node = document.createElement("span");
    		var textnode = document.createTextNode(char1+"~"+char2);
    		node.appendChild(textnode);
    		document.getElementById("selected-plug").appendChild(node);	

    		plugSetting[char1.charCodeAt(0)-65] = char2;
    		plugSetting[char2.charCodeAt(0)-65] = char1;
			
			return;
		}
		function pushButton(item){

			var resultBoard = document.getElementById("resultBoard");

			if(item.innerHTML.charCodeAt(0) == 32){
				resultBoard.value += " ";
				return;
			}

			var addWord = encryptWord(item.innerHTML);
			
			rotateRoter(3,0);
			if(notch3 == alphaPattern[slot3Rot-1]){
				rotateRoter(2,0);
				if(notch2 == alphaPattern[slot2Rot-1])
					rotateRoter(1,0);
			}					
			resultBoard.value += addWord;
		}
		function encryptWord(word){

			word = plugSetting[word.charCodeAt(0)-65];
			
			word = slot3[((word.charCodeAt(0)-65)+(26-slot3Rot)+(26-ringSet3))%26];
			word = alphaPattern[((word.charCodeAt(0)-65)+(slot3Rot)+(ringSet3))%26];
			
			word = slot2[((word.charCodeAt(0)-65)+(26-slot2Rot)+(26-ringSet2))%26];
			word = alphaPattern[((word.charCodeAt(0)-65)+(slot2Rot)+(ringSet2))%26];
			
			word = slot1[((word.charCodeAt(0)-65)+(26-slot1Rot)+(26-ringSet1))%26];
			word = alphaPattern[((word.charCodeAt(0)-65)+(slot1Rot)+(ringSet1))%26];
			
			word = refslot[word.charCodeAt(0)-65];

			word = slot1[((word.charCodeAt(0)-65)+(26-slot1Rot)+(26-ringSet1))%26];
			word = alphaPattern[((word.charCodeAt(0)-65)+(slot1Rot)+(ringSet1))%26];
			
			word = slot2[((word.charCodeAt(0)-65)+(26-slot2Rot)+(26-ringSet2))%26];
			word = alphaPattern[((word.charCodeAt(0)-65)+(slot2Rot)+(ringSet2))%26];
			
			word = slot3[((word.charCodeAt(0)-65)+(26-slot3Rot)+(26-ringSet3))%26];
			word = alphaPattern[((word.charCodeAt(0)-65)+(slot3Rot)+(ringSet3))%26];
						
			word = plugSetting[word.charCodeAt(0)-65];
			return word;
		}