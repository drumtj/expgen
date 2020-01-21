let debug = false;

function get(str){
	let m = this.exec(str);
	if(m){
		if(m.length == 1){
			return [m[0]];
		}else{
			return m.slice(1);
		}
	}else{
		return [""];
	}
}

function getAll(str){
	let reg = this.unwrap();
	let flags = [];
	if(reg.flags.indexOf('g') == -1){
		flags.push('g');
	}
	if(reg.flags.indexOf('m') == -1){
		flags.push('m');
	}
	if(flags.length){
		reg = new RegExp(reg.source, reg.flags+flags.join(''));
	}
	let t = str.matchAll(reg);
	let v, result=[];
	while(1){
		v = t.next();
		if(v.done) break;
		// console.error(v);
		if(v.value.length == 1){
			result.push(v.value[0]);
		}else{
			result.push(v.value.slice(1));
		}
	}
	return result;
	// return str.match(reg) || [];
}

function wrap(){
	return new RegExp((this.source.charAt(0) !== '^' ? '^' : '') + this.source + (this.source.charAt(this.source.length-1) !== '$' ? '$' : ''), this.flags);
}

function unwrap(){
	let s = this.source.charAt(0);
	let e = this.source.charAt(this.source.length-1);
	let source = this.source.slice(1,-1);
	return new RegExp((s === '^' ? '' : s) + source + (e === '$' ? '' : e), this.flags);
}

declare var RegExp;
RegExp.prototype.pattern = "";
RegExp.prototype.get = function(str){
	return get.call(this, str);
}

RegExp.prototype.getAll = function(str){
	return getAll.call(this, str);
}

RegExp.prototype.wrap = function(){
	return wrap.call(this);
}

RegExp.prototype.unwrap = function(){
	return unwrap.call(this);
}

function log(...rest){
	if(!debug) return;
	console.log.apply(null, Array.prototype.slice.apply(arguments));
}

function escapeRegExp(str, exceptions?) {
	if(!exceptions){
  	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	}

	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, (found)=>{
    // console.error({found})
		return exceptions.indexOf(found)>-1?found:'\\'+found;
		// return cmap2[found]?'\\'+cmap2[found]:'\\'+found;
	});
}

const unitA = String.fromCharCode(67+126);
const unitB = String.fromCharCode(67+127);
const unitC = String.fromCharCode(67+128);
const unitD = String.fromCharCode(67+125);

//문자 시프트 맵
const cmap = {
	'?': String.fromCharCode(67+129),
	'(': String.fromCharCode(67+130),
	')': String.fromCharCode(67+131),
	'*': String.fromCharCode(67+132),
	'!': String.fromCharCode(67+133),
	'{': String.fromCharCode(67+134),
	'}': String.fromCharCode(67+135),
	'|': String.fromCharCode(67+136),
	'^': String.fromCharCode(67+137),
	'$': String.fromCharCode(67+138),
	'\@': String.fromCharCode(67+139),
	'+': String.fromCharCode(67+140),
	'.': String.fromCharCode(67+141)
}
//다른 레이어의 문자 시프트 맵
const cmap2 = {
	'?': String.fromCharCode(67+150),
	'(?:': String.fromCharCode(67+151),
	'(:': String.fromCharCode(67+152),
	')': String.fromCharCode(67+153),
	'[': String.fromCharCode(67+154),
	']': String.fromCharCode(67+155),
	'!': String.fromCharCode(67+156),
	'^': String.fromCharCode(67+157),
	'{': String.fromCharCode(67+158),
	'}': String.fromCharCode(67+159),
	'*': String.fromCharCode(67+160)
}

//정규식 대응맵
//1 글자만 처리
const spch = {
	// '*': `(${cmap2['?']}:.*)`,// 붙어있는 모든 문자 {0,}
	// '!': '.',// 자리수를 차지하는 1글자
	'!': '[a-zA-Z0-9ㄱ-힣]',// 자리수를 차지하는 1글자
	// '!': '[-a-zA-Z0-9ㄱ-힣 _.@]',// 자리수를 차지하는 1글자
	// '!': pattern=>{
	// 	return pattern.replace(/\!+/g, (found)=>{
	// 		if(found.length > 1){
	// 			return `.${cmap2['{']}${found.length}${cmap2['}']}}`;
	// 		}else{
	// 			return found.replace(/\!/g, '.');
	// 		}
	// 	});
	// },
	// '?': `(?:.?)`,// 있을수도 없을수도있는 1글자
	// '?': `(?:[-a-zA-Z0-9ㄱ-힣 _.@]?)`,// 있을수도 없을수도있는 1글자
	'?': `(?:[a-zA-Z0-9ㄱ-힣]?)`,// 있을수도 없을수도있는 1글자
	// '?': pattern=>{
	// 	return pattern.replace(/\?+/g, (found)=>{
	// 		if(found.length > 1){
	// 			return `(?:.?)${cmap2['{']}1,${found.length}${cmap2['}']}`;
	// 		}else{
	// 			return found.replace(/\?/g, '(?:.?)');
	// 		}
	// 	});
	// },
	// '~': '+',// 이전글자 한개이상 연속된 {1,}
	'{': '(',//
	'}': ')',//
	'@': '\\D',
	'#': '\\d'//[0-9]',// 한자리수를 차지하는 숫자
	// #이 여러개붙으면 \d{1,n} 으로 만든다
	// '#': pattern=>{
	// 	return pattern.replace(/\#+/g, (found)=>{
	// 		if(found.length > 1){
	// 			return `\\d${cmap2['{']}${found.length}${cmap2['}']}`;
	// 		}else{
	// 			return found.replace(/#/g, '\\d');
	// 		}
	// 	});
	// }
};
const spchArr = Object.keys(spch);

//이것들의 이름은 다른이름에 포함되지 않는것으로 짓는다
const commandInCharset = {
	'&ko': 'ㄱ-힣',
	'&en': 'a-z',
	'&EN': 'A-Z',
	'&d': '0-9',
	'&w': 'a-zA-Z0-9',
	'&a': 'a-zA-Z',
	'&h': '0-9A-Fa-f',
	'&sb': `-\\'\\"!@#$%^&*(){},.+~:;_|\\/?<>\\[\\]\`\\\\`
	//"&s": '-!@#$%^&*(){},.+~:;'_|\\/?<>\\[\\]\\`]'
	// '!': '^'
}
const commandInCharsetSortedKeys = Object.keys(commandInCharset).sort((a,b)=>{
	return b.length-a.length;
})
//escape처리와 명령어 변환과정에서 끝까지 보호해야할 문자 리스트
//cmap에도 이 문자가 있어야 된다.
const expSpCharList = ['|', '^', '$', '\@', '+', '.', '*'];
const imgExt = "(png|jpg|jpeg|gif|tif|bmp|ai|svg|jpe|jfif|jp2|j2c|psd|tga|taga)";
// const rgbNum = "[1-2]?[0-9]?[0-9]";
const presets = {
	"&email": "{{[&a][&w-_]*}\\@{[&a][&w-_]*(\\.[&a]+){1,2}}}",
	// "&number": "{[-+]?[&d]+([.][&d]+)?}",
	// "&number": "{[-+]?[&d]+([.][&d]+)?(e[+][&d]+)?}",
	"&number": "{{[-+]?}{[&d]+}([.]{[&d]+})?({e[+][&d]+})?}",
	"&domain": `{{http(s)?}://{[^"';{}(),*]+}}`,
	"&hex": "{(0x|\\#){([&h]{3}|[&h]{6})}}", //#5454ff, 0x31a5df
	// "&rgb": `{rgb\\({${rgbNum}},( +)?{${rgbNum}},( +)?{${rgbNum}}\\)}`, // rgb(255,255, 255)
	// "&rgba": `{rgba\\({${rgbNum}},( +)?{${rgbNum}},( +)?{${rgbNum}},( +)?{[&d]([.][&d])?}\\)}`, //rgba(255,255, 255,255)
	"&rgb": "{rgb\\({[&d]+}, *{[&d]+}, *{[&d]+}\\)}",
	"&rgba": "{rgba\\({[&d]+}, *{[&d]+}, *{[&d]+}, *{[&d]+([.][&d]+)?}\\)}",
	"&img": `{{[^"'(]*}[.]{${imgExt}}}['") ]*`,
	"&symbol": "{[&sb]+}",
	"&imgext": `{${imgExt}}`,
	//"&html": /<([a-zA-Z0-1-]+)>(.*)<\/\1>/g, "<{[a-zA-Z0-1-]+}>{*}<\\/\\1>" 속성있는 태그 잡는처리가 아직 안됨
}

// const presetsSortedKeys = Object.keys(presets).sort((a,b)=>{
// 	return b.length-a.length;
// })
const charSelectorFindExpG = /\[([^\[\]]+)\](\?)?/g;
const charSelectorExceptionChars = ['^', '-'];
const lengthExpG = /\{((?:\d+)?,?(?:\d+)?)\}/g
const groupFindExp = /\(([^\(\)]+)\)(\?)?/;
const groupFindExpG = /\(([^\(\)]+)\)(\?)?/g;
const getterExpG = /\}\?/g

function expgen(pattern, flag){

	if(typeof flag !== "string"){
    flag = undefined;
  }

	//명령줄 선 처리
	//다른명령어에 포함되는 명령어가 있는경우 때문에 가장 긴 명령부터 처리해야함
	//presets는 외부에 노출된 변수로, 변동사항이 있을 수 있기때문에 매번 정렬을 해야함.
	Object.keys(presets).sort((a,b)=>{
		return b.length-a.length;
	}).forEach(com=>{
		if(pattern.indexOf(com) > -1){
			pattern = pattern.replace(new RegExp(escapeRegExp(com), 'g'), presets[com]);
		}
	})

	let originPattern = pattern;


	let fixedWords = [];
	pattern =	pattern.replace(/\\./g, found=>{
    fixedWords.push(found);
		return unitB + (fixedWords.length-1) + unitB;
	})
	log("고정문자 시프트", pattern, fixedWords);


	let charSelectorList = [];

	// let charSelectorFindExp = /\[([^\[\]]+)\](\?)?/;

	pattern = pattern.replace(charSelectorFindExpG, (found,word,q)=>{
		// console.error("before", word);
		// word = word.split(';').map(com=>{
		// 	return commandInCharset[com]?cmap2[commandInCharset[com]]||commandInCharset[com]:com;
		// }).join(';');

		// 이 처리로 인해 expgen에서는 []안에 역슬래시(쌍역슬래시)를 안붙이고 특문을 써도 된다.
		// 대신 commandInCharset에 추가하는 명령 이름은 escape처리에 걸리지 않는 문자로해야함
		word = escapeRegExp(word, charSelectorExceptionChars);


		commandInCharsetSortedKeys.forEach(com=>{
			if(word.indexOf(com) > -1){
				word = word.replace(new RegExp(escapeRegExp(com), 'g'), cmap2[commandInCharset[com]]||commandInCharset[com]);
			}
		})
		// console.error("after", word);
		charSelectorList.push(cmap2['['] + word + cmap2[']'] + (q?cmap2[q]:''));
		return unitA + (charSelectorList.length-1) + unitA;
	})
	log("문자셋정규식 시프트", pattern, charSelectorList);



	let lengthExpList = [];
	// let lengthExpG = /\{((?:\d+)?,?(?:\d+)?)\}/g
	pattern = pattern.replace(lengthExpG, (found,word,q)=>{
		lengthExpList.push(cmap2['{'] + word + cmap2['}']);
		return unitD + (lengthExpList.length-1) + unitD;
	})
	log("길이표현식{} 시프트", pattern, lengthExpList);

	//
	// pattern = pattern.replace(getterExpG, '}'+cmap2['?'])
	// log("getter{}다음 물음표 변환", pattern);

  let optionalWords = [];
	// function analysisWordGroup(pt){
	// let groupFindExp = /\(([^\(\)]+)\)(\?|\*)?/;
	// let groupFindExpG = /\(([^\(\)]+)\)(\?|\*)?/g;
	while(groupFindExp.test(pattern)){
	  pattern = pattern.replace(groupFindExpG, (found,word,q)=>{
			let cword = cmap2['(?:'] + word + cmap2[')'] + (q?cmap2[q]:'');
      optionalWords.push(cword);
      let key = unitC + (optionalWords.length-1) + unitC;
	    log({found,word,q, key, cword})
	    return key;
	    // return `(${word})${must?'':'?'}`;
	  })
	}

  log("옵셔널 단어처리:", pattern, optionalWords);

	// *이 여러개붙으면 하나로 만든다.
  // pattern = pattern.replace(/\*+/g, '*');
  // log("* 중복제거:", pattern);

	expSpCharList.forEach(c=>{
		if(cmap[c] && pattern.indexOf(c) > -1){
	    pattern = pattern.replace(new RegExp(escapeRegExp(c), 'g'), cmap[c]);
		}
  })
	log("정규식 문자 시프트:", pattern);

  // 와일드 카드가 escape처리를 피하도록 문자 시프트
  spchArr.forEach(c=>{
		if(cmap[c] && pattern.indexOf(c) > -1){
	    pattern = pattern.replace(new RegExp(escapeRegExp(c), 'g'), cmap[c]);
		}
  })
	log("와일드카드 문자 시프트:", pattern);


  //와일드 카드를 제외한 나머지 문자를 RegExp에 쓸수 있도록 escape처리
  pattern = escapeRegExp(pattern);
	log("escape:", pattern);

  // 복구
  spchArr.forEach(c=>{
		if(cmap[c] && pattern.indexOf(c) > -1){
	    pattern = pattern.replace(new RegExp(cmap[c], 'g'), c);
		}
  })
  log("와일드카드 문자 복구:", pattern);

	// 복구
  expSpCharList.forEach(c=>{
		if(cmap[c] && pattern.indexOf(c) > -1){
	    pattern = pattern.replace(new RegExp(cmap[c], 'g'), c);
		}
  })
  log("정규식 문자 복구:", pattern);



	for(let i=optionalWords.length-1; i>=0; i--){
    pattern = pattern.replace(unitC + (i) + unitC, optionalWords[i]);
  }
  log("옵셔널단어 문자치환:", pattern);

	for(let i=lengthExpList.length-1; i>=0; i--){
    pattern = pattern.replace(unitD + (i) + unitD, lengthExpList[i]);
  }
  log("길이표현식 문자치환:", pattern);

	//////
	for(let char in cmap){
		if(pattern.indexOf(cmap[char]) > -1){
	    pattern = pattern.replace(new RegExp(cmap[char], 'g'), char);
		}
  }
  log("1단계치환문자 복구", pattern);

  spchArr.forEach(c=>{
    if(typeof spch[c] === "function"){
      pattern = spch[c](pattern);
    }else{
			if(pattern.indexOf(c) > -1){
	      pattern = pattern.replace(new RegExp(escapeRegExp(c), 'g'), spch[c]);
			}
    }
  })
  log("와일드카드 정규식 처리:", pattern);
	//////

	for(let i=charSelectorList.length-1; i>=0; i--){
    pattern = pattern.replace(unitA + (i) + unitA, charSelectorList[i]);
  }
  log("문자셋정규식 문자치환:", pattern);






	let tempstr;
	for(let i=fixedWords.length-1; i>=0; i--){
		tempstr = unitB + (i) + unitB;
		if(pattern.indexOf(tempstr) > -1){
    	pattern = pattern.replace(new RegExp(tempstr, 'g'), fixedWords[i]);
		}
  }
  log("고정문자 문자치환:", pattern);

  for(let char in cmap2){
		if(pattern.indexOf(cmap2[char]) > -1){
    	pattern = pattern.replace(new RegExp(cmap2[char], 'g'), char);
		}
  }
  log("2단계치환문자 복구", pattern);

  let exp = new RegExp("^"+pattern+"$", flag);
	exp.pattern = originPattern;
	return exp;
	// return new RegExp(pattern);
}

expgen.presets = presets;

export default expgen;
