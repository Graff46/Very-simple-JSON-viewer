function JsonViewer (jsonData, id) {

	const createDetail = (key, elm, deep)=>{
		let det = document.createElement('details');
		det.style['margin-left'] = `${deep}em`;
		let sumr = document.createElement('summary');
		sumr.innerText = key;
		elm.appendChild(det);
		det.appendChild(sumr);
		return det;
	};

	const createLineArr = (val, elm, deep)=>{
		let p = document.createElement('p');
		p.style['margin-left'] = `${deep}em`;
		p.className = "value-array";
		p.innerText = val;
		elm.appendChild(p);
	};

	const createLineObj = (key, val, elm, deep) => {
		let p = document.createElement('p');
		p.style['margin-left'] = `${deep}em`;
		p.className = "value-object";
		p.innerText = `${key}: ${val}`;
		elm.appendChild(p);
	}

	const parse = (jsn, elm, deep) => {
    	let itm = null;
    	for (let k in jsn) {
    		itm = jsn[k];
      		if (typeof itm == 'object') {
				elm = createDetail(k, elm, deep);
      			parse(itm, elm, ++deep);
			}
      		else {
				if (Number(k) == NaN)
					createLineObj(k, itm, elm, deep);
				else
					createLineArr(itm, elm, deep);
			}
    	}
  	}
	
	let prnt = document.getElementById(id);
	if (prnt) {
		let div = document.createElement('div');
		div.className = "json--viewer";
		prnt.appendChild(div);
		parse(jsonData, div, 0);
	} else {
		console.error(`JsonViewer: element by id "${id}" not found!`);
	}
}

//Example use:
//JsonViewer([7, 5, [8, {v: 88, n: 45}]], "app");
